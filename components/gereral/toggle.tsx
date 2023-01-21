export default function Toggle ({ toggleState }: { toggleState: [boolean, (value: boolean) => void] }) {
    return (
        <label htmlFor="toggle" className="flex items-center cursor-pointer relative">
            <input type="checkbox" id="toggle" className="sr-only" defaultChecked={!toggleState[0]}
            onChange={(e) => toggleState[1](!e.target.checked)}/>
            <div className="toggleBg block bg-gray w-12 h-6 rounded-full"/>
            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"/>
        </label>
    )
}