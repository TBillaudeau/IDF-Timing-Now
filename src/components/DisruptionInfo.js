function info(selectedDisruption) {
    selectedDisruption = selectedDisruption.selectedDisruption
    return (
        <div className="bg-white rounded-lg m-2 sm:m-6 p-4 lg:p-6">
            {selectedDisruption ? (
                <div>
                    {selectedDisruption.disruption ? (
                        <>
                            <div className="flex items-center mb-6">
                                <img
                                    src={process.env.PUBLIC_URL + `/images/${selectedDisruption.lineId.split(':').pop()}.svg`}
                                    alt={selectedDisruption.lineId}
                                    className="h-8 mr-2"
                                />
                                <p className="text-sm xl:text-base xl:font-semibold flex grow">{selectedDisruption.disruption.title}</p>
                                <p className="hidden xl:block font-semibold mr-4"> {selectedDisruption.disruption.cause}</p>
                            </div>
                            <a href={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${selectedDisruption.lineId.split(':').pop().replace(/:/g, '_')}.png`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${selectedDisruption.lineId.split(':').pop().replace(/:/g, '_')}.png`}
                                    alt={selectedDisruption.lineId}
                                    className="w-full border p-2 border-gray-300"
                                />
                            </a>

                            <div
                                dangerouslySetInnerHTML={{ __html: selectedDisruption.disruption.message }}
                                className="border border-gray-300 p-4 rounded-lg mt-2 overflow-y-auto	max-h-[25rem]"
                            />
                        </>
                    ) : (
                        <p>No disruption details available for this line.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-500">Click on a train line to view disruption details.</p>
            )}
        </div>
    )
}

export default info