// // src/components/Features.jsx
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 }
// };

// export default function Features({ items }) {
//   return (
//     <section className="features" id="why-hitec">
//       <h2>Why Choose HITEC?</h2>
//       <div className="feature-grid">
//         {items.map((feat, i) => {
//           const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
//           return (
//             <motion.div
//               className="feature-item"
//               key={i}
//               ref={ref}
//               variants={cardVariants}
//               initial="hidden"
//               animate={inView ? "visible" : "hidden"}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//             >
//               <h3>{feat.title}</h3>
//               <p>{feat.text}</p>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
