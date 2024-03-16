type ProductType = {
    _id:string,
    title:string,
    description:string,
    image:FileType | string | null,
    price:number | string,
    productType:"COURSE" | "EVENT",
}
type DataItem = {
    name: string;
    value: number;
}

type FileType = {
    url:string,
    fileId:string
}

