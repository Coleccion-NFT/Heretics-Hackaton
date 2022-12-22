const logo = "./HereticsLogo.png"

export const ChatMessage = ({ message }) => {
    return (
        <div className="w-fit h-fit bg-white flex pl-3 pr-4 py-1 items-center rounded-2xl mt-1">
            <img src={logo} className="w-7 h-auto mr-5" />
            {message}
        </div>
    )
}

export default ChatMessage
