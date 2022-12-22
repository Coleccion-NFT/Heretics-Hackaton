const Loader = ({ h, w }) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full h-24 w-24 border-b-2 border-red-700`} />
            {/* TODO: Poner ciertos tamaños i ya */}
        </div>
    )
}

export default Loader
