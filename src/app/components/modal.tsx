'use client'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useState } from 'react'

interface EditModal {
  closeModal: () => void
  editHero: (name: string, description: string) => void
  isopen: boolean
}

export default function Modal({ closeModal, isopen, editHero }: EditModal) {
  const [inputValue, setInputValue] = useState('')
  const [textAreaValue, setTextAreaValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editHero(inputValue, textAreaValue)
    closeModal()
  }

  return (
    <Dialog open={isopen} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold tracking-wide text-gray-900"
                  >
                    Edit Hero
                  </DialogTitle>
                  <div className="mt-2">
                    <form
                      id="form"
                      onSubmit={handleSubmit}
                      className="space-y-2"
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Name"
                        className="w-full p-2 ring-2 ring-black outline-none"
                      />
                      <textarea
                        placeholder="Description"
                        value={textAreaValue}
                        onChange={e => setTextAreaValue(e.target.value)}
                        className="w-full h-32 p-2 ring-2 ring-black outline-none"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="form"
                className="inline-flex w-full justify-center bg-blue-600 px-3 py-2 text-base text-white shadow-sm ring-2 ring-black hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                id=""
                type="button"
                data-autofocus
                onClick={() => closeModal()}
                className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-2 ring-black hover:bg-gray-300 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
