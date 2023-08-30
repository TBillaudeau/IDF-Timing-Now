import React, { useState } from 'react';

function AccordionItem({ id, title, content }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id={`accordion-open-${id}`} data-accordion="open">
      <h2 id={`accordion-open-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border`}
          data-accordion-target={`#accordion-open-body-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-open-body-${id}`}
          onClick={toggleAccordion}
        >
          <span className="flex items-center">{title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${isOpen ? 'rotate-180' : 'rotate-0'} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-open-body-${id}`}
        className={`${isOpen ? '' : 'hidden'}`}
        aria-labelledby={`accordion-open-heading-${id}`}
      >
        {content}
      </div>
    </div>
  );
}

function AccordionWithMargin() {

  return (
    <div className="m-2 sm:m-6 bg-white w-full">
      <AccordionItem
        id="1"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            What is IDF Timing Now?
          </span>
        }
        content={
          <div className="p-5 border border-b-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now est un site web qui fournit des informations en temps réel sur les départs des différents modes de transport public, y compris le métro, le tramway, le train, le RER et le bus, dans la région Ile de France.
            </p>
            <p className="text-gray-500">
              Le site web propose également des informations sur le trafic et permet aux utilisateurs de rechercher des stations spécifiques pour obtenir des heures de départ précises. Que vous fassiez la navette ou que vous exploriez la région, IDF Timing Now vous aide à planifier votre voyage en toute simplicité.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="2"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Comment utiliser IDF Timing Now ?
          </span>
        }
        content={
          <div className="p-5 border border-b-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Il est facile d'utiliser IDF Timing Now. Il suffit d'entrer le nom de la station souhaitée dans la barre de recherche, et le site web affichera les heures de départ en temps réel pour les différents modes de transport.
            </p>
            <p className="text-gray-500">
              Vous pouvez également consulter les perturbations du trafic et connaître l'heure d'arrivée estimée de vos stations préférées. IDF Timing Now vous aide à rester informé et à prendre des décisions sur vos déplacements.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="3"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Rester informé grâce à IDF Timing Now real-time datas
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Accédez aux mises à jour en temps réel des heures de départ et des horaires de transport. Les informations sont constamment mises à jour pour vous fournir les données les plus récentes.
            </p><p className="mb-2 text-gray-500">
              Que vous planifiez votre voyage ou que vous recherchiez le prochain trajet disponible, vous pouvez être sûr que les informations que vous recevez sont exactes et à jour.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="4"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Personnalisez votre expérience
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              IDF Timing Now vous permet de personnaliser votre expérience en sauvegardant vos stations préférées pour un accès rapide.
            </p>
            <p className="text-gray-500">
              Il vous suffit d'ajouter des stations à vos favoris pour que le site Web les mémorise pour vous. Cette fonction vous permet de rester facilement informé des heures de départ des stations que vous fréquentez le plus.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="5"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Planifier à l'avance grâce à l'info trafic
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Outre les heures de départ, IDF Timing Now fournit également des informations sur le trafic en temps réel pour les différents modes de transport.
            </p>
            <p className="text-gray-500">
              Avant de commencer votre voyage, vérifiez s'il y a des perturbations ou des retards qui pourraient affecter vos plans de voyage. Restez informé et prenez des décisions éclairées grâce à des informations routières actualisées.
            </p>
          </div>
        }
      />
      <AccordionItem
        id="6"
        title={
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Feedback and Support
          </span>
        }
        content={
          <div className="p-5 border border-t-0 border-gray-200">
            <p className="mb-2 text-gray-500">
              Nous apprécions vos commentaires ! Si vous avez des suggestions, des questions ou des problèmes lors de l'utilisation de IDF Timing Now, n'hésitez pas à contacter notre équipe de support.
            </p>
            <p className="text-gray-500">
              Vos commentaires nous aident à améliorer continuellement le site web et à vous offrir la meilleure expérience possible. Nous sommes là pour vous aider à chaque étape !
            </p>
          </div>
        }
      />
    </div>
  );

}


export default AccordionWithMargin;
