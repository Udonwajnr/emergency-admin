"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://emergency-backend-api.onrender.com/api/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(users)

  return (
    <Container>
      <main className="p-3">
          <h1 className="text-2xl font-semibold mb-4">User Table</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Contacts
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {user.phoneNumber}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-50 border border-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Full Name
                              </th>
                              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Phone Number
                              </th>
                              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Email
                              </th>
                              <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Relationship
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.contact.length > 0 ? (
                              user.contact.map((contact) => (
                                <tr key={contact._id}>
                                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {contact.fullName}
                                  </td>
                                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {contact.phoneNumber}
                                  </td>
                                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {contact.email}
                                  </td>
                                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                    {contact.relationship}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700 text-center"
                                >
                                  No contacts found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700 text-center"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </Container>
  );
}
