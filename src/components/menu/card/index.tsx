"use client"
import { useRouter } from "next/navigation"

interface MenuCardProps {
    firstIcon?: React.ReactNode,
    lastIcon?: React.ReactNode,
    title?: string,
    subTitle?: string
    action?: {
        card?: {
            path?: string
        },
        button?: {
            name?: string,
            path?: string
        }
    }
}

export const MenuCard: React.FC<MenuCardProps> = (props) => {
    const router = useRouter()

    const handleCardClick = () => {
        if (props.action?.card?.path) {
            router.push(props.action?.card?.path)
        }
    }

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent the card click from firing
        if (props.action?.button?.path) {
            router.push(props.action?.button?.path)
        }
    }

    return (
        <div onClick={handleCardClick} className="cursor-pointer select-none hover:ring-gray-300 bg-gray-50/25 w-full h-fit p-2 rounded-md ring-1 ring-gray-200 shadow-md">
            <div className="w-full flex flex-row gap-2 items-start justify-start h-fit">
                {props.firstIcon}
                <div className="w-full">
                    <p className="font-medium text-[15px] text-gray-700">{props.title}</p>
                    <p className="text-xs text-gray-500">{props.subTitle}</p>
                    <div className="mt-4 mb-3 flex flex-row h-fit gap-2 items-center justify-between w-full">
                        <div onClick={handleButtonClick} className="flex flex-row">
                            <div className="bg-gray-50 flex items-center justify-center hover:bg-green-600 hover:text-gray-100 w-[70px] px-1 py-1 ring-1 ring-gray-300 rounded-md text-xs font-medium capitalize">{props.action?.button?.name || "ADD"}</div>
                        </div>
                        <div>{props.lastIcon}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
