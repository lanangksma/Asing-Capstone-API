const { fs_food } = require("../config/firestore");

const tipsGetById = async (request, h) => {
    try {
        const { id } = request.params;

        if (!id) {
            const response = h.response({
                status: "fail",
                message: "Id is required",
            });
            response.code(400);
            return response;
        }

        const tipsSnapshot = await fs_food
            .collection("tips")
            .where("id", "==", id)
            .get();

        if (tipsSnapshot.empty) {
            const response = h.response({
                status: "fail",
                message: "Tips not found",
            });
            response.code(404);
            return response;
        }

        const tips = tipsSnapshot.docs[0].data();

        return {
            status: "success",
            data: tips,
        };
    } catch (error) {
        throw new InputError(
            "Terjadi kesalahan dalam mendapatkan tips",
            500
        );
    }
};

const getAllTips = async () => {
    try {
        const tipsSnapshot = await fs_food.collection("tips").get();

        if (tipsSnapshot.empty) {
            const response = h.response({
                status: "fail",
                message: "No tips found",
            });
            response.code(404);
            return response;
        }

        const tips = tipsSnapshot.docs.map(doc => doc.data());

        return {
            status: "success",
            data: tips,
        };
    } catch (error) {
        throw new InputError(
            "Terjadi kesalahan dalam mendapatkan tips",
            500
        );
    }
};

module.exports = { tipsGetById, getAllTips };