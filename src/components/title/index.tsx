"use client"
interface ITitle {
    title: string
}
export const Title: React.FC<ITitle> = (props) => {
    return (
        <div className="px-4 flex items-center justify-start  h-[36px] border w-full bg-gray-50/70 font-medium text-sm text-gray-600"><p>{props.title}</p></div>
    )
}