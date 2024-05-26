import Link from 'next/link';
import React from 'react'

// このフェッチ関数を呼びだすときに記事idを指定しよう
const getDetailBBS = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/post/${id}`, {
      cache: "no-store",
    });
  
    const bbsDetailData = await response.json();
    return bbsDetailData;
  }
// フォルダの[bbsId]のところと同じ名前にすることで取得可能
const BBSDetailPage = async ({ params }: { params: { bbsId: number } }) => {

    const bbsDetailData = await getDetailBBS(params.bbsId)
    const { title, content, username } = bbsDetailData;
    // console.log(bbsDetailData)

  return (
    <div className='mx-auto max-w-4xl p-4'>
        <div className='mb-8'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-gray-700'>{username}</p>
        </div>

        <div className='mb-8'>
            <p className='text-gray-900'>{content}</p>
        </div>

        <Link href={"/"} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md'>戻る</Link>
    </div>
  )
}

export default BBSDetailPage