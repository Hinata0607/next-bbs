import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BBSdata } from "../types/types"

interface BSDataProps {
    bbsData: BBSdata;
}

const BBSCard = ({bbsData}: BSDataProps) => {

    const { title, content, createdAt, username, id } = bbsData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{username}</CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/bbs-posts/${id}`} className="text-blue-500">Read More</Link>
      </CardFooter>
    </Card>
  )
}

export default BBSCard