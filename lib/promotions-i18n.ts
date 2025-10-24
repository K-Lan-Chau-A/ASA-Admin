// Additional translations for promotions components
export const promotionsTranslations = {
  vi: {
    // Form fields
    promotionName: 'Tên promotion',
    description: 'Mô tả',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    discountType: 'Loại giảm giá',
    value: 'Giá trị',
    products: 'Sản phẩm',
    promotionNamePlaceholder: 'Nhập tên promotion',
    descriptionPlaceholder: 'Nhập mô tả promotion',
    selectDiscountType: 'Chọn loại giảm giá',
    selectStatus: 'Chọn trạng thái',
    enterPercentage: 'Nhập phần trăm (0-100)',
    enterAmount: 'Nhập số tiền',
    percentagePlaceholder: 'Nhập phần trăm (0-100)',
    amountPlaceholder: 'Nhập số tiền',
    selectedProducts: 'Đã chọn',
    loadingProducts: 'Đang tải sản phẩm...',
    datePlaceholder: 'dd/mm/yyyy',
    
    // Discount types
    percentage: 'Phần trăm (%)',
    fixedAmount: 'Số tiền cố định',
    
    // Product packages
    basicPackage: 'Gói Basic',
    premiumPackage: 'Gói Premium',
    testPackage: 'Gói test',
    
    // Validation messages
    fillAllFields: 'Vui lòng điền đầy đủ thông tin',
    percentageRange: 'Phần trăm giảm giá phải từ 0 đến 100',
    percentageRangeError: 'Phần trăm giảm giá phải từ 0 đến 100',
    amountGreaterThanZero: 'Số tiền giảm giá phải lớn hơn 0',
    amountRangeError: 'Số tiền giảm giá phải lớn hơn 0',
    selectAtLeastOneProduct: 'Vui lòng chọn ít nhất một sản phẩm',
    endDateAfterStartDate: 'Ngày kết thúc phải sau ngày bắt đầu',
    
    // Success/Error messages
    createSuccess: 'Tạo promotion thành công',
    updateSuccess: 'Cập nhật promotion thành công',
    createError: 'Không thể tạo promotion',
    updateError: 'Không thể cập nhật promotion',
    loadProductsError: 'Không thể tải danh sách sản phẩm',
    generalError: 'Có lỗi xảy ra khi tạo promotion',
    
    // Actions
    creating: 'Đang tạo...',
    updating: 'Đang cập nhật...',
    create: 'Tạo promotion',
    update: 'Cập nhật',
    cancel: 'Hủy',
    close: 'Đóng',
    
    // Success modal
    success: 'Thành công',
    error: 'Lỗi',
    suspendSuccess: 'Đã tạm dừng promotion thành công',
    activateSuccess: 'Đã kích hoạt promotion thành công',
    
    // Dialog titles and descriptions
    createPromotion: 'Tạo promotion mới',
    editPromotion: 'Chỉnh sửa promotion',
    createPromotionDescription: 'Tạo chương trình khuyến mãi mới cho các sản phẩm',
    editPromotionDescription: 'Cập nhật thông tin promotion',
    
    // Required field indicator
    required: '*',
    
    // Product selection
    selectProducts: 'Chọn sản phẩm',
    selectedCount: 'Đã chọn: {count} sản phẩm',
    noProductsSelected: 'Đã chọn: 0 sản phẩm',
    
    // Status
    currentlyActive: 'Đang hoạt động',
    inactive: 'Không hoạt động',
    expired: 'Đã hết hạn',
    suspended: 'Tạm dừng',
    
    // Actions
    edit: 'Chỉnh sửa',
    suspend: 'Tạm dừng',
    activate: 'Kích hoạt',
    
    // Search and filters
    searchPromotions: 'Tìm kiếm promotion...',
    searchPlaceholder: 'Tìm kiếm shops, promotions...',
    
    // Page titles
    promotionManagement: 'Quản lý Khuyến mãi',
    promotionManagementSubtitle: 'Tạo và quản lý các chương trình khuyến mãi cho shop',
    createPromotionButton: 'Tạo Khuyến mãi',
    
    // Export and filter
    exportData: 'Xuất dữ liệu',
    filter: 'Lọc',
  },
  en: {
    // Form fields
    promotionName: 'Promotion Name',
    description: 'Description',
    startDate: 'Start Date',
    endDate: 'End Date',
    discountType: 'Discount Type',
    value: 'Value',
    products: 'Products',
    promotionNamePlaceholder: 'Enter promotion name',
    descriptionPlaceholder: 'Enter promotion description',
    selectDiscountType: 'Select discount type',
    selectStatus: 'Select status',
    enterPercentage: 'Enter percentage (0-100)',
    enterAmount: 'Enter amount',
    percentagePlaceholder: 'Enter percentage (0-100)',
    amountPlaceholder: 'Enter amount',
    selectedProducts: 'Selected',
    loadingProducts: 'Loading products...',
    datePlaceholder: 'dd/mm/yyyy',
    
    // Discount types
    percentage: 'Percentage (%)',
    fixedAmount: 'Fixed Amount',
    
    // Product packages
    basicPackage: 'Basic Package',
    premiumPackage: 'Premium Package',
    testPackage: 'Test Package',
    
    // Validation messages
    fillAllFields: 'Please fill in all required fields',
    percentageRange: 'Discount percentage must be between 0 and 100',
    percentageRangeError: 'Discount percentage must be between 0 and 100',
    amountGreaterThanZero: 'Discount amount must be greater than 0',
    amountRangeError: 'Discount amount must be greater than 0',
    selectAtLeastOneProduct: 'Please select at least one product',
    endDateAfterStartDate: 'End date must be after start date',
    
    // Success/Error messages
    createSuccess: 'Promotion created successfully',
    updateSuccess: 'Promotion updated successfully',
    createError: 'Cannot create promotion',
    updateError: 'Cannot update promotion',
    loadProductsError: 'Cannot load products list',
    generalError: 'An error occurred while creating promotion',
    
    // Actions
    creating: 'Creating...',
    updating: 'Updating...',
    create: 'Create Promotion',
    update: 'Update',
    cancel: 'Cancel',
    close: 'Close',
    
    // Success modal
    success: 'Success',
    error: 'Error',
    suspendSuccess: 'Promotion suspended successfully',
    activateSuccess: 'Promotion activated successfully',
    
    // Dialog titles and descriptions
    createPromotion: 'Create New Promotion',
    editPromotion: 'Edit Promotion',
    createPromotionDescription: 'Create new promotional program for products',
    editPromotionDescription: 'Update promotion information',
    
    // Required field indicator
    required: '*',
    
    // Product selection
    selectProducts: 'Select Products',
    selectedCount: 'Selected: {count} products',
    noProductsSelected: 'Selected: 0 products',
    
    // Status
    currentlyActive: 'Currently Active',
    inactive: 'Inactive',
    expired: 'Expired',
    suspended: 'Suspended',
    
    // Actions
    edit: 'Edit',
    suspend: 'Suspend',
    activate: 'Activate',
    
    // Search and filters
    searchPromotions: 'Search promotions...',
    searchPlaceholder: 'Search shops, promotions...',
    
    // Page titles
    promotionManagement: 'Promotion Management',
    promotionManagementSubtitle: 'Create and manage promotional programs for shops',
    createPromotionButton: 'Create Promotion',
    
    // Export and filter
    exportData: 'Export Data',
    filter: 'Filter',
  }
}
