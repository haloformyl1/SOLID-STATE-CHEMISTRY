import { BilingualText } from '../../BilingualText';

export const ClassificationTree = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl p-6 overflow-x-auto border border-slate-200 dark:border-slate-800 shadow mt-6">
      <div className="min-w-[800px] flex flex-col items-center">
        {/* Root */}
        <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg text-center z-10 relative">
          <BilingualText en="Crystalline Solids" bn="স্ফটিকাকার কঠিন" />
          <div className="absolute w-1 h-8 bg-indigo-300 -bottom-8 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Level 1 Line */}
        <div className="w-3/4 h-1 bg-indigo-300 mt-8 relative">
          <div className="absolute w-1 h-8 bg-indigo-300 -top-8 left-1/2 -translate-x-1/2"></div>
          {/* Drop downs */}
          <div className="absolute w-1 h-8 bg-indigo-300 top-0 left-0"></div>
          <div className="absolute w-1 h-8 bg-indigo-300 top-0 left-1/3 -translate-x-1/2"></div>
          <div className="absolute w-1 h-8 bg-indigo-300 top-0 left-2/3 -translate-x-1/2"></div>
          <div className="absolute w-1 h-8 bg-indigo-300 top-0 right-0"></div>
        </div>

        {/* Level 1 Nodes */}
        <div className="flex w-full justify-between mt-8 relative px-4">
          <div className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow text-center w-40">
            <BilingualText en="Ionic Solids" bn="আয়নিক কঠিন" />
          </div>
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow text-center w-40">
            <BilingualText en="Metallic Solids" bn="ধাতব কঠিন" />
          </div>
          <div className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow text-center w-40">
            <BilingualText en="Covalent Solids" bn="সমযোজী কঠিন" />
          </div>
          <div className="flex flex-col items-center relative w-40">
            <div className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium text-sm shadow text-center w-full z-10">
              <BilingualText en="Molecular Solids" bn="আণবিক কঠিন" />
            </div>
            <div className="w-1 h-6 bg-sky-300 absolute top-full"></div>
            
            {/* Level 2 Line for Molecular */}
            <div className="w-64 h-1 bg-sky-300 mt-6 relative">
              <div className="absolute w-1 h-4 bg-sky-300 top-0 left-0"></div>
              <div className="absolute w-1 h-4 bg-sky-300 top-0 left-1/2 -translate-x-1/2"></div>
              <div className="absolute w-1 h-4 bg-sky-300 top-0 right-0"></div>
            </div>

            {/* Level 2 Nodes */}
            <div className="flex justify-between w-64 mt-4 absolute top-[70px] -left-12">
              <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-100 px-2 py-1 rounded text-xs border border-sky-300 dark:border-sky-700 text-center w-20">
                <BilingualText en="Non-Polar" bn="অধ্রুবীয়" />
              </div>
              <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-100 px-2 py-1 rounded text-xs border border-sky-300 dark:border-sky-700 text-center w-20">
                <BilingualText en="Polar" bn="ধ্রুবীয়" />
              </div>
              <div className="bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-100 px-2 py-1 rounded text-xs border border-sky-300 dark:border-sky-700 text-center w-20">
                <BilingualText en="H-Bonded" bn="হাইড্রোজেন-বন্ধনযুক্ত" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
