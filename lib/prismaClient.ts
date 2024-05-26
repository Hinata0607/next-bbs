import { PrismaClient } from '@prisma/client'

//公式ドキュメントベストプラクティス(next使用時)より抜粋。
//ホットリロードのたびに新しいprismaインスタンスが作られることがなくなり、警告されなくなる。
// 一度作成したインスタンスをオブジェクトに格納している。

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// これを使う(global)
export default prisma

// 開発環境なら一度作成したprismaインスタンスを再利用。
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma