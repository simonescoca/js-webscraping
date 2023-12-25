function getInputInfo (inputfile) {

    try {
    
        const howManyBrands = inputfile.length;
        let howManyModels = 0;
        let howManyVersions = 0;
        
        inputfile.forEach((brand) => {
            howManyModels += brand.models.length;
        });
    
        inputfile.forEach((brand) => {
            brand.models.forEach((model) => {
                howManyVersions += model.versions.length;
            })
        });
    
        const brandsInfo = {
            brands: howManyBrands,
            models: howManyModels,
            versions: howManyVersions
        };
    
        return brandsInfo;
    
    } catch (err) {
        console.log(err);
    }
}

module.exports = getInputInfo;