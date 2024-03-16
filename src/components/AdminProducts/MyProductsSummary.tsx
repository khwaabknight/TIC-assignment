import { productTypes } from '@/data/constants';
import { PieChart, Pie, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/shadcn/ui/card"


type MyProductsSummaryProps = {
  chartData:DataItem[]
}

function MyProductsSummary({chartData}:MyProductsSummaryProps) {

  const COLORS: string[] = ['#0088FE', '#FFBB28']; //these colors are also used in the labels below

  return (
    <div className='col-span-1 sm:block hidden p-5'>
      <div className=''>
        <h2 className='text-4xl font-medium text-slate-500 '>Products Summary :</h2>
      </div>

        <div className="w-full flex flex-col items-center my-5">
          <div className='flex items-end p-3 gap-4'>
            <div className='flex items-center justify-start'>
              <div className='bg-[#0088FE] w-3 h-3'/>
              <p>{productTypes.course}</p>
            </div>
            <div className='flex items-center justify-start'>
              <div className='bg-[#FFBB28] w-3 h-3'/>
              <p>{productTypes.event}</p>
            </div>
          </div>
          <PieChart width={180} height={180} className=''>
            <Pie
              data={chartData}
              cx={80}
              cy={80}
              outerRadius={80}
              fill="#fff"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} name='red' className='focus:outline-none'/>
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className=''>
          <Card>
            <CardHeader>
              <div className='flex justify-start items-baseline gap-5 text-3xl font-semibold text-slate-600 border-b'>
                <p className='text-2xl'>Total Products : </p>
                <p>{chartData.reduce((acc,item) => acc+item.value,0)}</p>
              </div>
            </CardHeader>
            <CardContent>
              {
                chartData.map((item) => (
                  <div className='flex justify-start items-center gap-5 text-2xl font-semibold text-slate-600'>
                    <p className='text-xl'>Total {item.name} : </p>
                    <p>{item.value}</p>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </div>
    </div>
  )
}

export default MyProductsSummary