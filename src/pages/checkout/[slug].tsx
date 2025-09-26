/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import { useRouter } from "next/router";

const CheckoutPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="h-screen flex items-center justify-center flex-col text-[#4f5660] bg-white text-[17px] px-5">
      <Image
        className="mb-6"
        src="/assets/images/check-icon.svg"
        alt="Check"
        width={70}
        height={70}
      />
      <h2 className="whitespace-pre-wrap mb-6 text-center">
        {slug == "success"
          ? "正常に決済が完了しました。\n決済履歴はアプリのMypageからも確認できます"
          : "正常に解約が完了しました。\n再度登録を行う場合はいつでもアプリから可能です。"}
      </h2>
      <a
        className="w-[315px] py-3 text-[17px] uppercase bg-[#F2F2F2] rounded-[26px] text-center"
        href={`https://main.d39tjydx9jeyry.amplifyapp.com/checkout/return?q=${slug}`}
      >
        アプリに戻る
      </a>
    </div>
  );
};

export default CheckoutPage;
