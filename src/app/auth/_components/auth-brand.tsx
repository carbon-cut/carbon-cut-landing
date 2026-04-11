import Image from "next/image";
import Link from "next/link";

export default function AuthBrand() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <Link href="/" className="inline-flex w-fit items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Image src={`${basePath}/logo/logoLight.svg`} alt="Carbon Cut" width={141} height={48} />
    </Link>
  );
}
