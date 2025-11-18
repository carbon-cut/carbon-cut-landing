//"use server";
const getAirports = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/airports`,
  ).then((e) => e.json());
  if (res.error) throw new Error(res.error.message);
  return res;
};
