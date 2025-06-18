import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function WorkInfo({
  formData,
  isEditing,
  handleChange,
  handleDateChange,
  handleAddPromotion,
  handlePromotionChange,
  handleRemovePromotion,
}) {
  // Format date for input field
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#F39200] border-b border-[#E0E0E0] pb-2">
        Work Experience
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="experienceYears"
            className="block text-sm font-medium text-[#F39200]"
          >
            Years of Experience
          </label>
          <input
            type="number"
            id="experienceYears"
            name="experienceYears"
            value={formData?.experienceYears || ""}
            onChange={handleChange}
            disabled={!isEditing}
            min="0"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E0E0E0] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200] bg-white disabled:bg-[#FFFDF0] transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="commencementDate"
            className="block text-sm font-medium text-[#F39200]"
          >
            Commencement Date
          </label>
          <input
            type="date"
            id="commencementDate"
            name="commencementDate"
            value={formatDate(formData?.commencementDate)}
            onChange={(e) =>
              handleDateChange(
                "commencementDate",
                e.target.value ? new Date(e.target.value) : null
              )
            }
            disabled={!isEditing}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E0E0E0] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200] bg-white disabled:bg-[#FFFDF0] transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="acumen"
          className="block text-sm font-medium text-[#F39200]"
        >
          Acumen/Skills (comma separated)
        </label>
        <textarea
          id="acumen"
          name="acumen"
          value={
            Array.isArray(formData?.acumen) ? formData.acumen.join(", ") : ""
          }
          onChange={(e) => {
            const skills = e.target.value.split(",").map((skill) => skill.trim());
            handleChange({
              target: {
                name: "acumen",
                value: skills,
              },
            });
          }}
          disabled={!isEditing}
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl border border-[#E0E0E0] focus:border-[#F39200] focus:ring-2 focus:ring-[#F39200] bg-white disabled:bg-[#FFFDF0] transition-all duration-300"
          placeholder="e.g. Project Management, Budgeting, Team Leadership"
        />
      </div>

      {/* Promotions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-[#F39200]">
            Promotions History
          </label>

          {isEditing && (
            <button
              type="button"
              onClick={handleAddPromotion}
              className="flex items-center gap-2 bg-[#F39200]/10 hover:bg-[#F39200]/20 text-[#F39200] px-4 py-2 rounded-xl transition-colors duration-300"
            >
              <Plus size={16} />
              <span>Add Promotion</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {formData?.promotions && formData.promotions.length > 0 ? (
            <div className="space-y-4">
              {formData.promotions.map((promotion, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-[#F5F5F5] rounded-xl"
                >
                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-medium text-[#F39200]">
                      Title
                    </label>
                    <input
                      type="text"
                      value={promotion.title}
                      onChange={(e) =>
                        handlePromotionChange(index, "title", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] focus:border-[#F39200] focus:ring-1 focus:ring-[#F39200] bg-white disabled:bg-[#FFFDF0] transition-all duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-medium text-[#F39200]">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formatDate(promotion.date)}
                      onChange={(e) =>
                        handlePromotionChange(index, "date", new Date(e.target.value))
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border border-[#E0E0E0] focus:border-[#F39200] focus:ring-1 focus:ring-[#F39200] bg-white disabled:bg-[#FFFDF0] transition-all duration-300"
                    />
                  </div>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemovePromotion(index)}
                      className="self-end text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-[#F5F5F5] rounded-xl text-[#F39200]">
              No promotions recorded yet.
              {isEditing && (
                <p className="text-sm mt-2">
                  Click the Add Promotion button to add your promotion history.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
