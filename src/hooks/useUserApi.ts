import axios from "axios";
import { FormState } from "@/types/formTypes";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

export const useUserApi = () => {
  const createUser = async (form: FormState) => {
    const formData = buildFormData(form);
    return axios.post(API_BASE, formData);
  };

  const updateUser = async (form: FormState) => {
    if (!form._id) throw new Error("Missing _id for update");
    const formData = buildFormData(form);
    return axios.put(`${API_BASE}/${form._id}`, formData);
  };

  const getUsers = async () => {
    const response = await axios.get(API_BASE);
    return response.data;
  };

  const deleteUser = async (id: string) => {
    return axios.delete(`${API_BASE}/${id}`);
  };

  const buildFormData = (form: FormState) => {
    const formData = new FormData();
    const { userProfile, contactInfo, employmentInfo, financialInfo, preferences } = form;

    formData.append("userProfile", JSON.stringify(userProfile));
    formData.append("contactInfo", JSON.stringify(contactInfo));
    formData.append("employmentInfo", JSON.stringify(employmentInfo));
    formData.append("financialInfo", JSON.stringify(financialInfo));
    formData.append("preferences", JSON.stringify(preferences));

    if (employmentInfo?.resume) {
      formData.append("resume", employmentInfo.resume[0]);
    }

    return formData;
  };

  return { createUser, updateUser, getUsers, deleteUser };
};
