import React, { useEffect, useState } from "react";
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
  CardFooter,
  IconButton,
  Input,
} from "@material-tailwind/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

const AssistantsByDoctor = () => {
  const { auth } = useAuth();
  const [assistants, setAssistants] = useState([]);
  const userId = auth.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/assistants/getAssistantsByDoctor/${userId}`,
          { withCredentials: true }
        );
        setAssistants(response.data);
        console.log(assistants);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Assistants
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Details about the last appointments
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Link to="create">
                <AddCircleOutlineIcon />
              </Link>
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
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  First Name
                </Typography>
              </th>

              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Last Name
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {assistants && assistants.length > 0
              ? assistants.map((value, index) => (
                  <tr key={value._id || index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      {value.firstName}
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      {value.lastName}
                    </td>
                  </tr>
                ))
              : null}
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

export default AssistantsByDoctor;
