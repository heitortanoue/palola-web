import WhiteCard from "./whiteCard";

export default function WhiteCardTopBorder ({ children, className, color, bgColor } :
    { children: any, className?: string, color: string, bgColor?: string }) {
    return (
        <div className={"relative"}>
            <div className="absolute w-full top-0 h-2 rounded-t-lg"
            style={{ backgroundColor: color }}/>
            <WhiteCard className={className + " pt-6"} bgColor={bgColor}>
                {children}
            </WhiteCard>
        </div>
    )
}