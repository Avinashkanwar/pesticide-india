import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Share2 } from 'lucide-react';

// Utility to convert numbers to words (simplified for rupees)
const numberToWords = (num) => {
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : '';
  return str.trim() === '' ? 'Zero Only' : str.trim() + ' Only';
};

const InvoiceScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    try {
      const sales = JSON.parse(localStorage.getItem('vendor_sales') || '[]');
      const found = sales.find(s => s.id === id);
      setSale(found);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  if (!sale) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-outfit">
        <p className="text-gray-500 font-semibold">Loading or Invoice not found...</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${sale.id}`,
          text: `Please find your invoice for ₹${sale.amount} attached.`,
          url: window.location.href, // Sharing the link, or user can print to PDF
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for desktop: prompt to save as PDF via print
      window.print();
    }
  };

  let totalQty = 0;
  if (sale.cartItems) {
    totalQty = sale.cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  } else {
    // Mock fallback
    totalQty = 1;
  }

  return (
    <div className="min-h-screen font-sans bg-gray-100/50 pb-10">
      <header className="px-5 py-4 flex items-center justify-between sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-500 hover:text-black"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold text-gray-900 m-0 leading-tight">View Invoice</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors border border-blue-200">
            <Share2 size={14} /> Share PDF
          </button>
          <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-300">
            <Printer size={14} /> Print / Save PDF
          </button>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto mt-6 px-4 print:mt-0 print:px-0">
        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-300 print:shadow-none print:border-none text-[12px] text-black">
          
          <div className="text-center font-bold text-lg border-b border-black pb-1 mb-2">
            TAX INVOICE
          </div>

          <div className="border border-black flex flex-col md:flex-row">
            {/* Left side: Company & Buyer */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-black flex flex-col">
              <div className="p-3 border-b border-black flex-1">
                <p className="font-bold text-[14px]">PesticideIndia</p>
                <p>123 Agri Market, Main Road</p>
                <p>Indore, Madhya Pradesh 452001</p>
                <p>Contact: +91 98765 43210</p>
                <p>GSTIN/UIN: 23AAAAA1234A1Z5</p>
              </div>
              <div className="p-3 flex-1">
                <p className="mb-1">Buyer (Bill to)</p>
                <p className="font-bold text-[13px]">{sale.customerName}</p>
                {sale.customerPhone && <p>Contact: {sale.customerPhone}</p>}
                <p>Place of Supply: Madhya Pradesh (23)</p>
              </div>
            </div>

            {/* Right side: Invoice Details */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex border-b border-black">
                <div className="w-1/2 p-2 border-r border-black">
                  <p className="text-[10px]">Invoice No.</p>
                  <p className="font-bold">{sale.id}</p>
                </div>
                <div className="w-1/2 p-2">
                  <p className="text-[10px]">Dated</p>
                  <p className="font-bold">{new Date(sale.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex border-b border-black">
                <div className="w-1/2 p-2 border-r border-black">
                  <p className="text-[10px]">Delivery Note</p>
                  <p className="font-bold">-</p>
                </div>
                <div className="w-1/2 p-2">
                  <p className="text-[10px]">Mode/Terms of Payment</p>
                  <p className="font-bold">{sale.method}</p>
                </div>
              </div>
              <div className="flex border-b border-black">
                <div className="w-1/2 p-2 border-r border-black">
                  <p className="text-[10px]">Supplier's Ref.</p>
                  <p className="font-bold">-</p>
                </div>
                <div className="w-1/2 p-2">
                  <p className="text-[10px]">Other Reference(s)</p>
                  <p className="font-bold">-</p>
                </div>
              </div>
              <div className="p-2 flex-1">
                <p className="text-[10px]">Despatch Document No.</p>
                <p className="font-bold">-</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border-x border-b border-black min-h-[300px] flex flex-col">
            <table className="w-full text-left border-collapse h-full">
              <thead>
                <tr className="border-b border-black">
                  <th className="p-2 border-r border-black w-12 text-center">Sl No.</th>
                  <th className="p-2 border-r border-black">Description of Goods</th>
                  <th className="p-2 border-r border-black w-24 text-center">HSN/SAC</th>
                  <th className="p-2 border-r border-black w-20 text-right">Quantity</th>
                  <th className="p-2 border-r border-black w-24 text-right">Rate</th>
                  <th className="p-2 border-r border-black w-12 text-center">per</th>
                  <th className="p-2 w-28 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sale.cartItems ? (
                  sale.cartItems.map((item, idx) => {
                    const price = parseFloat(item.price.replace(/,/g, ''));
                    const total = price * (item.qty || 1);
                    return (
                      <tr key={idx} className="align-top">
                        <td className="p-2 border-r border-black text-center">{idx + 1}</td>
                        <td className="p-2 border-r border-black font-bold">{item.name}</td>
                        <td className="p-2 border-r border-black text-center">3808</td>
                        <td className="p-2 border-r border-black text-right font-bold">{item.qty || 1} NOS</td>
                        <td className="p-2 border-r border-black text-right">{price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td className="p-2 border-r border-black text-center">NOS</td>
                        <td className="p-2 text-right font-bold">{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="align-top">
                    <td className="p-2 border-r border-black text-center">1</td>
                    <td className="p-2 border-r border-black font-bold">{sale.items}</td>
                    <td className="p-2 border-r border-black text-center">3808</td>
                    <td className="p-2 border-r border-black text-right font-bold">1 NOS</td>
                    <td className="p-2 border-r border-black text-right">{sale.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="p-2 border-r border-black text-center">NOS</td>
                    <td className="p-2 text-right font-bold">{sale.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                )}
                {/* Spacer to stretch min-height */}
                <tr className="flex-1">
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td className="border-r border-black"></td>
                  <td></td>
                </tr>
                {sale.discount > 0 && (
                  <tr className="align-bottom">
                    <td className="p-2 border-r border-black text-center"></td>
                    <td className="p-2 border-r border-black italic text-right">Less: Discount</td>
                    <td className="p-2 border-r border-black text-center"></td>
                    <td className="p-2 border-r border-black text-right"></td>
                    <td className="p-2 border-r border-black text-right"></td>
                    <td className="p-2 border-r border-black text-center"></td>
                    <td className="p-2 text-right">(-) {sale.discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Row */}
          <div className="flex border-x border-b border-black">
            <div className="flex-1 border-r border-black p-2 text-right font-bold">Total</div>
            <div className="w-20 border-r border-black p-2 text-right font-bold">{totalQty} NOS</div>
            <div className="w-24 border-r border-black"></div>
            <div className="w-12 border-r border-black"></div>
            <div className="w-28 p-2 text-right font-bold">₹ {sale.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
          </div>

          {/* Amount in words */}
          <div className="border-x border-b border-black p-2 flex flex-col">
            <p className="text-[10px]">Amount Chargeable (in words)</p>
            <p className="font-bold">INR {numberToWords(sale.amount)}</p>
          </div>

          {/* Footer details */}
          <div className="border-x border-b border-black flex flex-col md:flex-row min-h-[120px]">
            <div className="w-full md:w-1/2 p-2 border-b md:border-b-0 md:border-r border-black">
              <p className="underline mb-1 font-bold">Declaration</p>
              <p className="text-[10px]">
                We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. Goods once sold cannot be taken back.
              </p>
            </div>
            <div className="w-full md:w-1/2 p-2 relative flex flex-col">
              <p className="font-bold text-right">for PesticideIndia</p>
              <div className="mt-auto text-right">
                <p className="text-[10px] font-bold">Authorised Signatory</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-2 text-[10px]">
            SUBJECT TO INDORE JURISDICTION
            <br />
            This is a Computer Generated Invoice
          </div>

        </div>
      </main>
    </div>
  );
};

export default InvoiceScreen;
