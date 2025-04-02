import React from 'react';
import { X } from 'lucide-react';

export function FilterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle bg-white rounded-lg shadow-xl transform transition-all relative">
          <div className="absolute right-4 top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">

              </div>
              {/* <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9" />
                  <path d="M3 12h18" />
                  <path d="M12 3v18" />
                </svg>
                Reset all
              </button> */}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full  rounded-lg">
                <tbody>
                  <tr className=" ">
                    <td className="px-1 py-2 text-sm font-medium text-gray-700">Exchange</td>
                    <td className="px-4 py-2">
                      <select className="w-full p-2 min-w-[200px] border border-gray-150 rounded-lg bg-white">
                        <option>Any</option>
                        <option>BSE</option>
                        <option>NSE</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">Country</td>
                    <td className="px-4 py-2">
                      <select className="w-full p-2 min-w-[200px]  border border-gray-150 rounded-lg bg-white">
                        <option>Any</option>
                        <option>India</option>
                        <option>US</option>
                      </select>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="px-1 py-2 text-sm font-medium text-gray-700">Index</td>
                    <td className="px-4 py-2">
                      <select className="w-full p-2 min-w-[200px] border border-gray-150 rounded-lg bg-white">
                        <option>Any</option>
                        <option>Nifty 50</option>
                        <option>Nifty 100</option>
                        <option>Nifty 200</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-700">Sector</td>
                    <td className="px-4 py-2">
                      <select className="w-full p-2 min-w-[200px] border border-gray-150 rounded-lg bg-white">
                        <option>Any</option>
                        <option>Health Services</option>
                        <option>Consumer Durables</option>
                        <option>Electronic Technology</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-2 text-sm font-medium text-gray-700">Industry</td>
                    <td className="px-4 py-2">
                      <select className="w-full p-2 min-w-[200px] border border-gray-150 rounded-lg bg-white">
                        <option>Any</option>
                        <option>Aerospace</option>
                        <option>Aviation</option>
                        <option>Agriculture</option>
                      </select>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}