import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            1000,
            1000,
            "JPEG",
            60,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export default resizeFile;