const nvision = require("@nipacloud/nvision/dist/browser/nvision")

export class NipaApi {
    static  getObjectDection(b64img: string) {
        const objectDetectionService = nvision.objectDetection({
            apiKey: "cdb29f355cb4059995e054208cd7c06a332acfb83a0a29592e88c58f78a7e4f8a8c0c3cfd71391e67b466dc00b475424ac"
        });
        const result = objectDetectionService.predict({
            rawData: b64img
        }).then((response:object) => {
            return response
        });
        return result
    }
}