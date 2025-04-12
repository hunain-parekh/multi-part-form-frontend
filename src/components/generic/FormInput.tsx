// components/FormInput.tsx

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    register: any;
    errors: any;
    defaultValue?: string;
  }
  
  const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    register,
    errors,
    defaultValue,
  }) => {
    return (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(name)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
        )}
      </div>
    );
  };
  
  export default FormInput;
  