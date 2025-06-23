"use client"

import { useState } from "react"
import { ArrowLeft, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PersonalDataForm() {
  const slideUpAnimation = `
    @keyframes slide-up {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    .animate-slide-up {
      animation: slide-up 0.3s ease-out;
    }
  `

  const [formData, setFormData] = useState({
    namaLengkap: "",
    tinggiBadan: "",
    beratBadan: "",
    tanggalLahir: "",
    golonganDarah: "",
    jenisKelamin: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const isFormValid = () => {
    return (
      formData.namaLengkap.trim() !== "" &&
      formData.tinggiBadan.trim() !== "" &&
      formData.beratBadan.trim() !== "" &&
      formData.tanggalLahir.trim() !== "" &&
      formData.golonganDarah !== "" &&
      formData.jenisKelamin !== ""
    )
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log("=== DATA FORM YANG TERISI ===")
      console.log("Nama Lengkap:", formData.namaLengkap)
      console.log("Tinggi Badan:", formData.tinggiBadan + " cm")
      console.log("Berat Badan:", formData.beratBadan + " kg")
      console.log("Tanggal Lahir:", formData.tanggalLahir)
      console.log("Golongan Darah:", formData.golonganDarah)
      console.log("Jenis Kelamin:", formData.jenisKelamin)
      console.log("===============================")

      // Tampilkan bottom sheet instead of alert
      setShowSuccessModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white min-h-screen rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center p-4 pb-6">
          <ArrowLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
        </div>

        <div className="px-4 pb-20">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Isi Data Diri Kamu</h1>
          <p className="text-gray-500 mb-8">Masukan data diri kamu dengan benar.</p>

          {/* Form */}
          <div className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <Label htmlFor="nama" className="text-gray-600 text-sm mb-2">
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                value={formData.namaLengkap}
                onChange={(e) => handleInputChange("namaLengkap", e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl text-gray-900 bg-white mt-2"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Tinggi dan Berat Badan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tinggi" className="text-gray-600 text-sm mb-2">
                  Tinggi Badan
                </Label>
                <Input
                  id="tinggi"
                  value={formData.tinggiBadan}
                  onChange={(e) => handleInputChange("tinggiBadan", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl text-gray-400 bg-white mt-2"
                  placeholder="cm"
                />
              </div>
              <div>
                <Label htmlFor="berat" className="text-gray-600 text-sm mb-2">
                  Berat Badan
                </Label>
                <Input
                  id="berat"
                  value={formData.beratBadan}
                  onChange={(e) => handleInputChange("beratBadan", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl text-gray-400 bg-white mt-2"
                  placeholder="kg"
                />
              </div>
            </div>

            {/* Tanggal Lahir */}
            <div>
              <Label htmlFor="tanggal" className="text-gray-600 text-sm mb-2">
                Tanggal Lahir
              </Label>
              <div className="relative mt-2">
                <Input
                  id="tanggal"
                  value={formData.tanggalLahir}
                  onChange={(e) => handleInputChange("tanggalLahir", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl text-gray-900 bg-white pr-12"
                  placeholder="DD/MM/YYYY"
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Golongan Darah */}
            <div>
              <Label className="text-gray-600 text-sm mb-4 block">Golongan Darah</Label>
              <div className="grid grid-cols-4 gap-3">
                {["A", "B", "AB", "O"].map((type) => (
                  <div key={type} className="flex items-center justify-center">
                    <label className="flex flex-col items-center cursor-pointer">
                      <div className="flex items-center justify-center w-16 h-12 border border-gray-200 rounded-xl hover:border-blue-300">
                        <span className="text-gray-700 font-medium">{type}</span>
                      </div>
                      <input
                        type="radio"
                        name="golonganDarah"
                        value={type}
                        checked={formData.golonganDarah === type}
                        onChange={(e) => handleInputChange("golonganDarah", e.target.value)}
                        className="mt-2"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div>
              <Label className="text-gray-600 text-sm mb-4 block">Jenis Kelamin</Label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300">
                  <div className="w-6 h-6 text-blue-500">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                    </svg>
                  </div>
                  <span className="flex-1 text-gray-700">Laki-laki</span>
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="laki-laki"
                    checked={formData.jenisKelamin === "laki-laki"}
                    onChange={(e) => handleInputChange("jenisKelamin", e.target.value)}
                  />
                </label>
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300">
                  <div className="w-6 h-6 text-pink-500">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4C13.1 4 14 4.9 14 6C14 7.1 13.1 8 12 8C10.9 8 10 7.1 10 6C10 4.9 10.9 4 12 4Z" />
                    </svg>
                  </div>
                  <span className="flex-1 text-gray-700">Perempuan</span>
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="perempuan"
                    checked={formData.jenisKelamin === "perempuan"}
                    onChange={(e) => handleInputChange("jenisKelamin", e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full py-4 font-medium rounded-xl text-lg transition-all duration-300 ${
                isFormValid()
                  ? "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Selesai
            </Button>
          </div>
        </div>

        {/* Success Bottom Sheet */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
              <div className="bg-white w-full rounded-t-3xl p-6 transform transition-transform duration-300 ease-out animate-slide-up">
                
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <img 
                        src="/images/ic_runner.png" 
                        alt="Success" 
                        className="w-12 h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Data Berhasil Disimpan</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Untuk mengubah data, kamu bisa mengakses menu profil.
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleCloseModal}
                  className="w-full py-4 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-medium rounded-xl text-lg"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}