import React, { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "../../api/axios";
import useAuth from "../components/hooks/useAuth";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";

const AppointmentsTable = () => {
  const { auth } = useAuth();
  const [appointments, setAppointments] = useState({});
  const userId = auth.accessToken

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/appointments/list/${userId}`, { withCredentials: true });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Appointments
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Details about the last appointments
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Status
                  </Typography>
                </th>

                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Appointment Time
                  </Typography>
                </th>

                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Appointment Date
                  </Typography>
                </th>

                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Doctor
                  </Typography>
                </th>

            </tr>
          </thead>
          <tbody>

              {appointments && appointments.length > 0 ? (appointments.map((value, index) => (
                <tr key={value._id || index} >
                    <td
                    className="p-4 border-b border-blue-gray-50"
                    >
                    {value.status}
                    </td>

                    <td
                    className="p-4 border-b border-blue-gray-50"
                    >
                    {value.appointmentTime}
                    </td>

                    <td
                    className="p-4 border-b border-blue-gray-50"
                    >
                    {value.appointmentDate}
                    </td>

                    <td
                    className="p-4 border-b border-blue-gray-50"
                    >
                    {value.doctor.name}
                    </td>
                </tr>
              ))): null}

          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentsTable;
