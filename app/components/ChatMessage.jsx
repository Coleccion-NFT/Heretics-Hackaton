const logo = "./HereticsLogo.png"

export const ChatMessage = ({ message, authorUid, userUid, photoURL }) => {
    const isAuthor = authorUid == userUid
    return (
        <>
            <div className="chat-message">
                {isAuthor ? (
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                            <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-red-500 text-white">
                                    {message}
                                </span>
                            </div>
                        </div>
                        <img className="w-6 h-6 rounded-full order-2" src={photoURL} />
                    </div>
                ) : (
                    <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                                    {message}
                                </span>
                            </div>
                        </div>
                        <img className="w-6 h-6 rounded-full order-1" src={photoURL} />
                    </div>
                )}
            </div>
        </>
    )
}

export default ChatMessage

// <div className="w-fit h-fit bg-white flex pl-3 pr-4 py-1 items-center rounded-2xl mt-1">
//     <img src={logo} className="w-7 h-auto mr-5" />
//     {message}
// </div>
