import React from 'react';
import selected from "@img/icons/selected_grean.svg";
import useSummation from "@/hooks/setSelection/useSummation";

function PrintSection() {
   const summations = useSummation()
   const styles = {
      printSection: {padding: 35},
      titleH3: {fontSize: 24, lineHeight: '2.5rem', marginBottom: 24},
      gridColumn2: {display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridColumnGap: '10px'},
      subtitle: {fontWeight: 600, color: '#000', display: 'inline-block', marginBottom: '12px'},
      flexRowStart: {display: 'flex', alignItems: 'start'},
      img: {width: 16, marginRight: 8, marginTop: 5},
      p: {fontSize: 16},
   }
   
   return (
      <div style={styles.printSection}>
         <h3 style={styles.titleH3}>Ваш список продуктов на неделю:</h3>
         <div style={styles.gridColumn2}>
            {summations.map(item => (
               <ul key={item.name} style={{marginBottom: 24}}>
                  <li style={styles.subtitle}>{item.name}</li>
                  {item.products.map(product => (
                     <li key={product} style={styles.flexRowStart}>
                        <img src={selected} alt="selected" style={styles.img}/>
                        <p style={styles.p}>{product}</p>
                     </li>
                  ))}
               </ul>
            ))}
         </div>
      </div>
   );
}

export default PrintSection;