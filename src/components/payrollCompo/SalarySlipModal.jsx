import { X, Printer } from "lucide-react";

const SalarySlipModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex justify-between items-start border-b pb-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Payslip / Salary Slip</h2>
            <p className="text-xs text-gray-500 mt-0.5">Noteswift Pvt. Ltd. • Monthly Payroll</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Employee Summary */}
        <div className="bg-blue-50/60 rounded-xl p-4 mb-5 grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-xs text-gray-500 block">Employee Name</span>
            <span className="font-semibold text-gray-800">{employee.employeeName}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Employee ID</span>
            <span className="font-mono font-semibold text-gray-800">{employee.employeeId}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Department</span>
            <span className="font-medium text-gray-800">{employee.department}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Designation</span>
            <span className="font-medium text-gray-800">{employee.designation}</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between text-gray-600">
            <span>Basic Salary</span>
            <span className="font-mono">Rs. {Number(employee.basicSalary).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Allowances (+)</span>
            <span className="font-mono">+ Rs. {Number(employee.allowances).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Deductions / Tax (-)</span>
            <span className="font-mono">- Rs. {Number(employee.deductions).toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-3 mt-2">
            <span>Net Payable Salary</span>
            <span className="font-mono text-blue-600">
              Rs. {Number(employee.netSalary).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
          >
            <Printer size={16} />
            Print Slip
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipModal;
