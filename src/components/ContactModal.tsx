import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { Contact } from "../store/features/contactSlice";

const contactSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .max(10)
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
});

interface ContactModalProps {
  mode: "create" | "edit";
  onSave: (userData: Contact) => void;
  onDelete?: (userData: Contact) => void;
  initialData?: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
  };
}

const ContactModal: React.FC<ContactModalProps> = ({
  mode,
  onSave,
  onDelete,
  initialData,
}) => {
  const [userData, setUserData] = useState(
    initialData || {
      id: uuid(),
      fullName: "",
      phone: "",
      email: "",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string) => {
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const parsedData = contactSchema.safeParse(userData);
    if (parsedData.success) {
      onSave(parsedData.data);
    } else {
      const errorMessages: { [key: string]: string } = {};
      parsedData.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          errorMessages[error.path[0]] = error.message;
        }
      });
      setErrors(errorMessages);
    }
  };

  return (
    <div className="w-full bg-[#02090e] rounded-lg shadow-md z-10 p-6 sm:p-10 transition-all duration-300 ease-out">
      <div className="relative flex items-center justify-center mb-8 w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#E0DEDA]">
          {mode === "create" ? "Create Contact" : "Edit Contact"}
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full rounded-md flex flex-col gap-2">
          <InputField
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            icon={<IoPersonCircleOutline size={20} className="text-gray-950" />}
            initialValue={userData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <InputField
            name="phone"
            label="Phone Number"
            placeholder="+91 234 567 8900"
            icon={<FaPhoneAlt size={20} className="text-gray-950" />}
            type="tel"
            initialValue={userData.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />
          <InputField
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            icon={<AiOutlineMail size={20} className="text-gray-950" />}
            type="email"
            initialValue={userData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSave}
            className="bg-black hover:bg-gray-900 text-white rounded py-2 px-6 transition duration-300 border-white border"
          >
            {mode === "create" ? "Create" : "Save Changes"}
          </button>
          {mode === "edit" && onDelete && (
            <button
              onClick={() => {
                onDelete(userData);
              }}
              className="bg-[#F05656] hover:bg-red-600 border-white/80 border text-white rounded py-2 px-6 transition duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
  initialValue: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  icon,
  type = "text",
  initialValue,
  onChange,
  error,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(name, newValue);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-[#F9F9F9]/80 mb-2">
        {label}
      </label>
      <div className="flex items-center px-3 py-2 gap-2 bg-[#F9F9F9] rounded">
        {icon}
        <input
          id={name}
          name={type}
          type={type}
          className="w-full outline-none border-none pl-1.5 bg-[#F9F9F9]"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ContactModal;
