import axios from 'axios';

const WEB_API_BASE = process.env.REACT_APP_URL;

 export const ExportExcel = async (apiEnd, fileName, authToken) => {

    const axiosInstance = axios.create({
        baseURL: `${WEB_API_BASE}`,
        timeout: 5000,
        headers: { 'Content-Type': 'blob', 'x-auth-token': authToken }
    });

    const response = await axiosInstance.get(apiEnd, { responseType: 'arraybuffer' });
    console.log(response,"responseresponse")
    const outputFilename = `${fileName}_${Date.now()}.xlsx`;
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', outputFilename);
    document.body.appendChild(link);
    link.click();
}

export default ExportExcel();