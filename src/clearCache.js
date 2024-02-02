// import React, { useState, useEffect, Fragment } from "react";
// import moment from "moment";
// import packageJson from "../package.json";

// const buildDateGreaterThan = (latestDate, currentDate) => {
//   const momLatestDateTime = moment(latestDate);
//   const momCurrentDateTime = moment(currentDate);
//   let dataVal = false
//   if (momLatestDateTime.isAfter(momCurrentDateTime)) {
//     dataVal = true
//   }
//   else{
//     dataVal = false
//   }
//   return dataVal;
// };

// const refreshCacheAndReload = () => {
//     if (caches) {
//       // Service worker cache should be cleared with caches.delete()
//       caches.keys().then((names) => {
//         // for (const name of names) {
//         //   caches.delete(name);
//         // }
//         // console.log(names, "names")
//         names?.map((item) => {
//             return caches.delete(item);
//         })
//       });
//     }
//     // delete browser cache and hard reload
//     window.location.reload(true);
//   };

// function withClearCache(Component) {
//   function ClearCacheComponent(props) {
//     const [isLatestBuildDate, setIsLatestBuildDate] = useState(false);

//     console.log(isLatestBuildDate, "isLatestBuildDate")

//     useEffect(() => {
//       fetch("/meta.json")
//         .then((response) => response.json())
//         .then((meta) => {
//           const latestVersionDate = meta.buildDate;
//           const currentVersionDate = packageJson.buildDate;

//           const shouldForceRefresh = buildDateGreaterThan(
//             latestVersionDate,
//             currentVersionDate
//           );
//           if (shouldForceRefresh) {
//             setIsLatestBuildDate(false);
//             refreshCacheAndReload();
//           } else {
//             setIsLatestBuildDate(true);
//           }
//         });
//     }, []);

//     return (
//       <div >
//         {isLatestBuildDate ? <Component {...props} style={{}} /> : null}
//       </div>
//     );
//   }

//   return ClearCacheComponent;
// }

// export default withClearCache;