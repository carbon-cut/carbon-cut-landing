import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement } from "chart.js/auto";
ChartJS.register(ArcElement);
import { Doughnut } from "react-chartjs-2";
import { TabValues } from "@/lib/formTabs/types";
import doughtPlugin from "@/lib/chartPlugins/doughnut";
import { plugin } from "@/lib/chartPlugins/ChartJS";
import { getName } from "@/lib/formTabs/geters";
import { useScopedI18n } from "@/locales/client";

const tabs: TabValues[] = ["transport", "food", "vacation", "energie", "waste"];

type Props = {
  data: {
    color: string;
    name: TabValues;
    value: number;
    tons: number;
  }[];
  isAnimating: boolean;
};
function Categorisation({ data, isAnimating }: Props) {

  const t = useScopedI18n("result.categorisation")

  const { values, labels, colors } = useMemo(() => {
    if (typeof window === 'undefined') return { values: [], labels: [], colors: [] };
    const values: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    data.forEach((elem) => {
      labels.push(elem.name);
      values.push(elem.tons);
      const color = 
        window.getComputedStyle(document.documentElement)
        .getPropertyValue(`--section-${elem.name}`)
        .trim();
        console.log(elem.name, ' ', color);
      colors.push(color);
    });
    return {
      values,
      labels,
      colors
    };
  }, [data]);

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-light text-foreground mb-10 tracking-tight">
        {t('title')}
      </h2>

      <div className="bg-white flex flex-row-reverse rounded-2xl border border-[#E0F2F1] p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full h-[350px] flex items-center justify-center">
          <Doughnut
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    title: (context) => {
                      return "";
                    },
                    label: (context) => {
                      return getName(context.label);
                    },
                    afterLabel: (context) => {
                      return context.dataset.data[context.dataIndex] + "T";
                    },
                    
                  },
                },
              },
            }}
            //legends={{ display: false }}
            data={{
              labels: labels,
              datasets:
                values.length > 0
                  ? [
                      {
                        //label: ``,
                        data: values,
                        borderWidth: 1,
                        backgroundColor: colors.map((color) => `hsl(${color})`),
                      },
                    ]
                  : [],
            }}
            plugins={[doughtPlugin, plugin.noData]}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 w-9/12 mt-8">
          {data.map((item, index) => {
            
            const color = (opacity = 1 ) => {
              return`hsl(${colors[index]} / ${opacity})`
            };
            return(
            <div
              key={index}
              className="p-2 rounded-lg border-2 w-full"
              style={{
                borderColor: color(0.2),
                backgroundColor: color(0.1),
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-3 h-3 rounded-full `}
                  style={{backgroundColor: color()}}
                />
                <span className="font-light text-base text-foreground text-left">
                  {getName(item.name)}
                </span>
              </div>
              <div className="grid grid-cols-2 items-end">
              <p className="font-light text-xl" style={{ color: color() }}>
                {item.tons.toFixed(2)} t
              </p>
              <p className="font-light text-base text-gray-500">{item.value}%</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}

/* function DasFunc (){
  const [R, setR] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    import("recharts")
      .then((mod) => {
        console.log("recharts module keys:", Object.keys(mod));
        // also dump potentially problematic nested exports
        if (mounted) setR(mod);
      })
      .catch((e) => {
        console.error("failed to dynamic-import recharts", e);
        if (mounted) setErr(String(e));
      });
    return () => { mounted = false; };
  }, []);

  if (err) {
    return (
      <div className="mb-20">
        <h2 className="text-3xl font-light text-foreground mb-10 tracking-tight">Breakdown by Category</h2>
        <div className="bg-white p-8 rounded-2xl border border-[#E0F2F1]">
          <p className="text-sm text-red-600">Chart failed to load: {err}</p>
        </div>
      </div>
    );
  }

  if (!R) {
    return <div className="mb-20">Loading chart…</div>;
  }
  else return <></>
  
} */

export default Categorisation;

/* <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey="value"
                    animationDuration={isAnimating ? 1000 : 0}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={CustomTooltip} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => (
                      <span className="font-light text-sm">
                       
                        {value} - {entry?.payload?.tons?.toFixed(2)} tons
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer> */
