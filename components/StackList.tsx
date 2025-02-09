'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ExpandedStateProps, ListModalProps, StackListDataProps } from '@interfaces';
import { motion, AnimatePresence } from 'framer-motion';
import StringToJSX from './StringToJSX';
import { VscFoldDown } from 'react-icons/vsc';
import { AiOutlineClose } from 'react-icons/ai';
import { MapComponent } from '@components/'

const StackList = ({
  data = [],
  options = {
    config: {
      useData: false,
      useDataProp: false,
      useModal: false,
    },
    container: {
      customClass: 'w-full bg-white shadow overflow-hidden rounded-md max-w-sm mx-auto mb-5'
    },
    components: [
      {
        element: 'h3',
        className: 'h3 text-start',
        dataProperty: '',
        text: `<span className='text-accent'>Position</span>`,
      },
      {
        element: 'p',
        className: 'mt-0 max-w-2xl text-[9px] text-gray-500 text-start',
        dataProperty: '',
        text: 'Subtext',
      },
    ],
    modalComponent: {
      windowTitle: '',
      dataProperty: 'location',
      childComponent: 'map'
    }
  }
}: StackListDataProps) => {
  const listContainer = useRef<HTMLUListElement>(null);
  const modalBodyContainer = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<ExpandedStateProps>({
    arrowRotation: 0,
    open: false,
  });
  const [toggleModal, setToggleModal] = useState<ListModalProps>({
    visible: false,
    selectedID: 0
  })
  const { config, container, components, modalComponent } = options;
  const { arrowRotation, open } = isExpand;
  const { visible, selectedID } = toggleModal;

  useEffect(() => {
    const parentElement = listContainer.current;

    if (parentElement) setClientHeight(parentElement.clientHeight);

    return () => setIsExpand({ arrowRotation: 0, open: false });
  }, [data]);

  const Label = ({
    element = 'h3',
    className = 'h3 text-accent px-5',
    text = 'Label'
  }): JSX.Element => <StringToJSX domString={`<${element}>${text}</${element}>`} className={className} />

  const MainList = ({
    data = null,
    components,
    onClick = () => console.log("events")
  }: { data?: null | undefined, components: any, onClick: (() => void) | undefined }) => {
    return (
      <li
        className={`w-full border-t border-gray-200 cursor-pointer ${config.useModal && 'sm:hover:scale-105 transform transition-all duration-300'}`}
        onClick={onClick}
      >
        <div className='p-2 sm:p-4 relative'>
          <div className='flex flex-col items-start'>
            {components && components.map(({ element, className, dataProperty, text }: { [key: string]: string }, i: number) => (
              <Label
                key={i}
                element={element}
                className={className}
                text={config.useDataProp ? renderValue(data![dataProperty]) : text}
              />
            ))}
          </div>
          <div className={`${!config.useModal && 'sm:hidden'} border-solid border-l-gray-900 border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute top-[45%] right-[2%] sm:right-[5%]`} />
        </div>
      </li>
    )
  };

  const ModalList = () => {
    let modalData = data[selectedID][modalComponent.dataProperty];
    return (
      <>
        {modalData && modalData.map((child: { [key: string]: any }, a: number) => (
          <div
            key={a}
            className='text-left'
          >
            <h3 className='text-white/90 font-bold text-sm mb-2'>{child.title}</h3>
            <ul className='list-outside list-disc pl-5'>
              {child.description.map((res: string[], b: number) => <li key={b} className='li mb-1'>{res}</li>)}
            </ul>
          </div>
        ))}
      </>
    )
  };

  const ModalMap = () => {
    let modalData = data[selectedID][modalComponent.dataProperty];
    return (
      <div className=' overflow-hidden'>
        <MapComponent {...modalData} />
      </div>
    )
  };

  const handleListExpand = () => {
    setIsExpand((prevState) => ({
      ...prevState,
      open: !prevState.open,
      arrowRotation: prevState.arrowRotation + 180
    }))
  };

  const handleToggleModal = (visible: boolean, i: number) => {
    setToggleModal(prevState => ({ 
      ...prevState, 
      visible, 
      selectedID: i 
    }))
  }

  const renderValue = (elems: string) => {
    if (Array.isArray(elems)) {
      return elems.map(({ title }) => title).join(' | ');
    }

    return elems
  };

  return (
    <AnimatePresence>
      <motion.div
        key='container'
        className={`sm:rounded-sm sm:overflow-hidden relative`}
        initial={{
          height: clientHeight >= 368
            ? '100%'
            : '23rem'
        }}
        animate={{
          height: open
            ? '100%'
            : '23rem'
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.ul
          ref={listContainer}
          className={`${!open && clientHeight >= 368 && 'sm:disable'} w-[28em] xs:w-[22em] sm:w-full bg-white shadow max-w-sm mx-auto mb-5 sm:mb-0 rounded-sm sm:rounded-none overflow-hidden`}
        >
          {config.useData && config.useDataProp
            ? data.map((res: any, i: number) => (
              <MainList
                key={i}
                data={res}
                components={components}
                onClick={() => handleToggleModal(true, i)}
              />)
            ) : (
              <MainList
                components={components}
                onClick={() => handleToggleModal(false, 0)}
              />)
          }
        </motion.ul>
        {
          clientHeight >= 368 && (
            <div className={`hidden w-full sm:flex absolute bottom-0 justify-end ${!open && 'bg-[#131424] shadow-[rgba(19,20,36,1)_0_5px_18px_33px]'}`}>
              <span
                className='text-accent cursor-pointer p-2 pt-3 bg-[#131424]'
                onClick={handleListExpand}
              >
                <VscFoldDown
                  style={{
                    transform: `rotate(${arrowRotation}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                />
              </span>
            </div>
          )
        }
      </motion.div>
      {visible && config.useModal && (
        <motion.div
          key='modal'
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalBodyContainer}
            className='rounded-sm shadow-md sm:w-[50%] w-[100%] sm:m-2 m-2 max-h-[27rem] xs:max-h-[35rem] sm:max-h-full overflow-y-scroll sm:overflow-y-auto
            scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-h-6 relative'
            layoutId={`card-container-${selectedID}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className={`flex flex-row items-center justify-between border-b border-gray-200 bg-[#131424] p-1 w-full ${modalComponent.childComponent !== 'map' && 'sticky top-0 sm:static'}`}>
              <h2 className='text-xl font-bold text-accent ml-2 animate-pulse duration-300'>{modalComponent.windowTitle}</h2>
              <span
                className='cursor-pointer text-accent text-xl'
                onClick={() => handleToggleModal(false, 0)}
              >
                <AiOutlineClose className='animate-pulse duration-300' />
              </span>
            </div>
            <div className='flex flex-col gap-4 border-gray-200 bg-[#131424] p-3'>
              {modalComponent.childComponent === 'list' && <ModalList />}
              {modalComponent.childComponent === 'map' && <ModalMap />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export default StackList;