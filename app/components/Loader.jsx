const Loader = ({ h, w }) => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className={`animate-spin rounded-full h-${h} w-${w} border-b-2 border-red-700`} />
        </div>
    )
}

export default Loader
