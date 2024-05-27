"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    username: z.string()
        .min(2, {message: "ユーザ名は2文字以上で入力してください"}),
    title: z.string()
        .min(2, {message: "タイトルは2文字以上で入力してください"}),
    content: z.string()
        .min(10, {message: "本文は2文字以上で入力してください"})
        .max(140, {message: "本文は140文字以内で入力してください"}),
})

const CreateBSPage = () => {

  const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            title: "",
            content: "",
        }
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
      const { title, username, content } = value;
        // supabaseeに保存するためのAPIをたたく
      try {
        await fetch("http://localhost:3000/api/post", {
          // SSR(掲示板は更新が頻繁かもしれないので)
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, content, title }),
        });
        router.push("/");
        router.refresh();
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-1/2 px-7">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザー名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザー名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea
                    placeholder='投稿内容'
                    className='resize-none'
                    {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreateBSPage