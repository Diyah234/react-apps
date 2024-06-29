import React from 'react';
import { PiToolboxFill } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaHouseChimney } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { FaUsers } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { FaRegHandshake } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { BsBank } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { PiSpinnerBallFill } from "react-icons/pi";
import { MdSendToMobile } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import { LuBadgePercent } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='first'>
        <div><PiToolboxFill size={'23px'} color='#213F7D' opacity={'0.6'} /></div><div className='bold'>Switch Organization</div><div className='arrow'><RiArrowDropDownLine size={'35px'} color='#213F7D' /></div>
        </div>
        <div className='first'>
        <div><FaHouseChimney size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Dashboard</div>
        </div>

        <h4>CUSTOMERS</h4>
        <div className='active'>
        <div className='activetext'><div><HiUsers size={'18px'} color='#213F7D' /></div><div className='bold'>User</div></div>
        </div>
        <div className='first'>
        <div><FaUsers  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Guarantors</div>
        </div>
        <div className='first'>
        <div><FaSackDollar  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Loans</div>
        </div>
        <div className='first'>
        <div><FaRegHandshake  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Decision Models</div>
        </div>
        <div className='first'>
        <div><FaPiggyBank  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Savings</div>
        </div>
        <div className='first'>
        <div><FaHandHoldingUsd  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Loan Requests</div>
        </div>
        <div className='first'>
        <div><FaUserCheck  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Whitelist</div>
        </div>
         <div className='first'>
        <div><FaUserXmark  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Karma</div>
        </div>

        <h4>BUSINESSES</h4>
        <div className='first'>
        <div><PiToolboxFill size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Organization</div>
        </div>
        <div className='first'>
        <div><FaHandHoldingUsd  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Loan Products</div>
        </div>
        <div className='first'>
        <div><BsBank   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Savings Product</div>
        </div>
        <div className='first'>
        <div><FaCoins  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Fees and Charges</div>
        </div>
        <div className='first'>
        <div><MdSendToMobile  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Transactions</div>
        </div>
        <div className='first'>
        <div><PiSpinnerBallFill   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Services</div>
        </div>
        <div className='first'>
        <div><FaUserCog   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Service Account</div>
        </div>
         <div className='first'>
        <div><RiFilePaper2Line   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Settlements</div>
        </div>
        <div className='first'>
        <div><FaChartBar   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Reports</div>
        </div>

        <h4>CUSTOMERS</h4>
        <div className='first'>
        <div><FaSlidersH size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Preferences</div>
        </div>
        <div className='first'>
        <div><LuBadgePercent  size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Fees and Pricing</div>
        </div>
        <div className='first'>
        <div><FaClipboardList   size={'18px'} color='#213F7D' opacity={'0.6'} /></div><div className='fade'>Audit Logs</div>
        </div>
    </div>
  )
}
