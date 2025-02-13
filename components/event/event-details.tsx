"use client";

import { ENROLLED_AN_EVENT } from "@/queries/enrolled.query";
import { GET_EVENT_BY_ID } from "@/queries/event.query";
import { fadeIn, slideIn, staggerChildren } from "@/utils/animations";
import { SessionType } from "@/utils/types";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { Calendar, Clock, DollarSign, MapPin, Tag, Users } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EventDetails({
  session,
  userId,
  eventId,
}: {
  session: SessionType;
  userId: string;
  eventId: string;
}) {
  const user = session?.user || null;

  const { data, refetch } = useQuery(
    GET_EVENT_BY_ID({
      query: `title, date, time, location, category, capacity, price, image,id , organizer { name, email}  `,
    }),
    {
      variables: { id: eventId, userId },
    }
  );

  const event = { ...data?.event, isEnrolled: data?.isEnrolled };

  const router = useRouter();
  const pathname = usePathname();

  const [enrolledAnEvent] = useMutation(ENROLLED_AN_EVENT);

  const handleRegister = async () => {
    if (!user) {
      return router.push("/login?next=" + pathname);
    } else {
      try {
        await enrolledAnEvent({
          variables: { userId, eventId: event.id },
        });
        refetch();
        toast.success("You have successfully registered for the event");
      } catch {
        toast.error("An error occurred while registering for the event");
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-width  mx-auto px-3 relative py-6 md:py-10"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl font-bold mb-6 text-center text-myPrimary"
      >
        {event.title}
      </motion.h1>

      <motion.div
        variants={slideIn}
        className="bg-white rounded-lg shadow-md p-4 md:py-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
              width={800}
              height={500}
            />
            <h2 className="text-2xl font-semibold mb-4 text-mySecondary ">
              Event Details
            </h2>
            <div className="space-y-1.5">
              <p className="flex items-center">
                <Calendar className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Date:</strong> &nbsp; {event.date}
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>time: </strong> &nbsp;
                {event?.time}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Location:</strong> &nbsp;{event.location}
              </p>
              <p className="flex items-center">
                <Tag className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Category:</strong>
                <span className="text-myAccent"> &nbsp;{event.category}</span>
              </p>
              <p className="flex items-center">
                <Users className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Capacity:</strong> &nbsp;{event.capacity} attendees
              </p>
              <p className="flex items-center">
                <DollarSign className="mr-2 w-8 h-8 bg-violet-100 text-violet-700 stroke-[2.5px] p-2 rounded-md" />
                <strong>Price:</strong> &nbsp; {event.price}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-mySecondary">
              Description
            </h2>
            <p className="mb-4">{event.description}</p>
            <h3 className="text-xl font-semibold mb-2">Organizer</h3>
            <p className="mb-4">{event?.organizer?.name}</p>
            <h3 className="text-xl font-semibold mb-2">
              Additional Information
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Please arrive 15 minutes before the event starts</li>
              <li>Parking is available at the venue</li>
              <li>Light refreshments will be served</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg transition-all duration-300 disabled:opacity-50"
          onClick={handleRegister}
          disabled={event?.isEnrolled}
        >
          {event?.isEnrolled ? "Already Registered" : "Register for Event"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
