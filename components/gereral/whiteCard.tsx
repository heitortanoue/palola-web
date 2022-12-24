export default function WhiteCard ({ children, className, bgColor } : { children: any, className?: string, bgColor?: string }) {
    return (
        <div className={"rounded-lg p-5 shadow-md " + className}
        style={{ backgroundColor: bgColor ? bgColor : "#FFFFFF"}}>
            {children}
        </div>
    )
}