import BBSCardList from "./components/BBSCardList";
import { BBSdata } from "./types/types";

const getBBSALLData = async () => {
  // 掲示板データをフェッチ
  const response = await fetch("http://localhost:3000/api/post", {
    // SSR(掲示板は更新が頻繁かもしれないので)
    cache: "no-store",
  });

  // SSRなのでサーバー側(ターミナル)で確認すべし
  const bbsAllData = await response.json();
  return bbsAllData;
  // console.log(bbsAllData);
}

export default async function Home() {

  const bbsAllData: BBSdata[] = await getBBSALLData();

  return (
    <main>
      <BBSCardList bbsAllData={bbsAllData}/>
    </main>
  );
}
