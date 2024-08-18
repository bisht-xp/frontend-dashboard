import { useState } from "react";
import Card from "../components/Card";
import ContactModal from "../components/ContactModal";
import ClickOutside from "../components/ClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addContact,
  deleteContact,
  updateContact,
} from "../store/features/contactSlice";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

interface Contact {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCreateContact = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleSave = (userData: Contact) => {
    dispatch(addContact(userData));
    setIsModalOpen(false);
    toast.success("Successfully created!!");
  };

  const handleUpdate = (userData: Contact) => {
    dispatch(updateContact(userData));
    setIsModalOpen(false);
    toast.success("Successfully updated!!");
  };

  const handleDelete = (userData: Contact) => {
    dispatch(deleteContact(userData.id));
    setIsModalOpen(false);
    toast.success("Successfully deleted!!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:pb-10">
        <div className="max-w-[540px] mx-auto mb-10">
          <h2 className="text-center text-2xl md:text-[54px] md:leading-[60px] font-bold text-[#E0DEDA]">
            Want to create new contacts
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateContact}
            className="bg-black text-white text-lg border-white border px-4 py-2 rounded-lg inline-flex items-center font-medium justify-center hover:bg-gray-900 transition"
          >
            Create Contact
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        {contacts.length !== 0 ? (
          <div className="w-full grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                fullName={contact.fullName}
                phoneNumber={contact.phone}
                email={contact.email}
                onClick={() => handleCardClick(contact)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex-col md:w-[540px] mx-auto mt-8 justify-center items-center">
            <div className="flex justify-center mt-4">
              <MdCancel className="text-white" size="40px" />
            </div>
            <p className="text-center p-3 text-[17px] text-[#E0DEDA]">
              No Contact Found
              <br />
              <span className="text-[#98948C]">
                Please add contact from create contact button.
              </span>
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed z-40 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center duration-300 ease-out">
          <ClickOutside
            className="w-[90%] md:w-[60%] lg:w-[460px]"
            onClick={() => setIsModalOpen(false)}
          >
            <ContactModal
              mode={selectedContact ? "edit" : "create"}
              onSave={selectedContact ? handleUpdate : handleSave}
              onDelete={selectedContact ? handleDelete : undefined}
              initialData={selectedContact || undefined}
            />
          </ClickOutside>
        </div>
      )}
    </div>
  );
};

export default Home;
