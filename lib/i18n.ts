export type Language = 'vi' | 'en'

export interface Translations {
  // Common
  common: {
    dashboard: string
    shops: string
    users: string
    transactions: string
    promotions: string
    packages: string
    analytics: string
    settings: string
    help: string
    logout: string
    search: string
    add: string
    edit: string
    delete: string
    save: string
    cancel: string
    close: string
    back: string
    next: string
    previous: string
    loading: string
    noData: string
    actions: string
    status: string
    date: string
    amount: string
    description: string
    name: string
    email: string
    phone: string
    address: string
    active: string
    inactive: string
    pending: string
    expired: string
    completed: string
    failed: string
    basic: string
    premium: string
    monthly: string
    yearly: string
    details: string
  }
  
  // Dashboard
  dashboard: {
    title: string
    subtitle: string
    newShopsToday: string
    totalActiveShops: string
    revenueToday: string
    premiumPackages: string
    revenueOverview: string
    revenueOverviewSubtitle: string
    recentShopActivities: string
    recentShopActivitiesSubtitle: string
    daily: string
    weekly: string
    monthly: string
    fromYesterday: string
    fromLastWeek: string
    fromLastMonth: string
  }
  
  // Shops
  shops: {
    title: string
    subtitle: string
    addShop: string
    searchShop: string
    package: string
    owner: string
    expiryDate: string
    monthlyRevenue: string
    details: string
    edit: string
    basicPackage: string
    premiumPackage: string
    status: {
      active: string
      expired: string
      pending: string
    }
  }
  
  // Users
  users: {
    title: string
    subtitle: string
    addEmployee: string
    searchEmployee: string
    fullName: string
    role: string
    phoneNumber: string
    status: string
    export: string
    filter: string
    superAdmin: string
    admin: string
    support: string
    working: string
    suspended: string
  }
  
  // Transactions
  transactions: {
    title: string
    subtitle: string
    totalTransactions: string
    monthlyRevenue: string
    successfulTransactions: string
    failedTransactions: string
    searchTransaction: string
    exportData: string
    filter: string
    shop: string
    package: string
    type: string
    paymentMethod: string
    subscription: string
    renewal: string
    upgrade: string
    refund: string
    bankTransfer: string
    creditCard: string
    successRate: string
    failureRate: string
  }
  
  // Promotions
  promotions: {
    title: string
    subtitle: string
    createPromotion: string
    searchPromotion: string
    discountType: string
    discountValue: string
    startDate: string
    endDate: string
    targetPackage: string
    usage: string
    minSubscriptionMonths: string
    appliesTo: string
    all: string
    basicPackage: string
    premiumPackage: string
    percentage: string
    fixed: string
    from: string
    to: string
    months: string
    currentlyActive: string
    expired: string
    suspended: string
    activate: string
    suspend: string
  }
  
  // Packages
  packages: {
    title: string
    subtitle: string
    createPackage: string
    price: string
    subscribers: string
    features: string
    featuresIncluded: string
    monthly: string
    yearly: string
    discount: string
    currentlyActive: string
    suspended: string
    packageStats: string
    packageStatsSubtitle: string
    totalShopSubscriptions: string
    monthlyRevenue: string
    activePremiumPackages: string
  }
  
  // Analytics
  analytics: {
    title: string
    subtitle: string
    overview: string
    revenue: string
    shops: string
    packages: string
    totalRevenue: string
    totalShops: string
    retentionRate: string
    premiumPackages: string
    industryDistribution: string
    industryDistributionSubtitle: string
    areaDistribution: string
    areaDistributionSubtitle: string
    restaurants: string
    fashion: string
    convenience: string
    pharmacy: string
    technology: string
    district1: string
    district3: string
    district5: string
    district10: string
    district7: string
    revenueChart: string
    revenueChartSubtitle: string
    shopPackageChart: string
    shopPackageChartSubtitle: string
    packagePerformance: string
    packagePerformanceSubtitle: string
    chartPlaceholder: string
  }
  
  // Settings
  settings: {
    title: string
    profile: string
    profileSubtitle: string
    personalInfo: string
    updatePersonalInfo: string
    firstName: string
    lastName: string
    updateInfo: string
    contactInfo: string
    manageContactInfo: string
    workEmail: string
    workPhone: string
    emergencyContact: string
    updateContact: string
    security: string
    securitySubtitle: string
    communication: string
    communicationSubtitle: string
    permissions: string
    permissionsSubtitle: string
    language: string
    languageSubtitle: string
    updateDetails: string
    managePassword: string
    emailPhone: string
    accessControl: string
    selectLanguage: string
    vietnamese: string
    english: string
  }
  
  // Header
  header: {
    searchPlaceholder: string
    myAccount: string
    profile: string
    settings: string
    logout: string
  }
}

export const translations: Record<Language, Translations> = {
  vi: {
    common: {
      dashboard: 'Dashboard',
      shops: 'Shops',
      users: 'Người dùng',
      transactions: 'Giao dịch',
      promotions: 'Khuyến mãi',
      packages: 'Gói dịch vụ',
      analytics: 'Phân tích',
      settings: 'Cài đặt',
      help: 'Trợ giúp',
      logout: 'Đăng xuất',
      search: 'Tìm kiếm',
      add: 'Thêm',
      edit: 'Chỉnh sửa',
      delete: 'Xóa',
      save: 'Lưu',
      cancel: 'Hủy',
      close: 'Đóng',
      back: 'Quay lại',
      next: 'Tiếp theo',
      previous: 'Trước đó',
      loading: 'Đang tải...',
      noData: 'Không có dữ liệu',
      actions: 'Thao tác',
      status: 'Trạng thái',
      date: 'Ngày',
      amount: 'Số tiền',
      description: 'Mô tả',
      name: 'Tên',
      email: 'Email',
      phone: 'Số điện thoại',
      address: 'Địa chỉ',
      active: 'Hoạt động',
      inactive: 'Không hoạt động',
      pending: 'Chờ xử lý',
      expired: 'Hết hạn',
      completed: 'Hoàn thành',
      failed: 'Thất bại',
      basic: 'Cơ bản',
      premium: 'Nâng cao',
      monthly: 'Hàng tháng',
      yearly: 'Hàng năm',
      details: 'Chi tiết',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Tổng quan về thống kê và hiệu suất nền tảng POS của bạn.',
      newShopsToday: 'Shops mới hôm nay',
      totalActiveShops: 'Tổng số Shops hoạt động',
      revenueToday: 'Doanh thu hôm nay',
      premiumPackages: 'Gói Premium',
      revenueOverview: 'Tổng quan Doanh thu',
      revenueOverviewSubtitle: 'Doanh thu hàng tháng từ đăng ký shop',
      recentShopActivities: 'Hoạt động Shop gần đây',
      recentShopActivitiesSubtitle: 'Đăng ký và gia hạn shop mới nhất',
      daily: 'Hàng ngày',
      weekly: 'Hàng tuần',
      monthly: 'Hàng tháng',
      fromYesterday: 'so với hôm qua',
      fromLastWeek: 'so với tuần trước',
      fromLastMonth: 'so với tháng trước',
    },
    shops: {
      title: 'Quản lý Shops',
      subtitle: 'Quản lý tất cả các shop đăng ký sử dụng POS',
      addShop: 'Thêm Shop',
      searchShop: 'Tìm kiếm shop...',
      package: 'Gói',
      owner: 'Chủ sở hữu',
      expiryDate: 'Hết hạn',
      monthlyRevenue: 'Doanh thu tháng',
      details: 'Chi tiết',
      edit: 'Chỉnh sửa',
      basicPackage: 'Cơ bản',
      premiumPackage: 'Nâng cao',
      status: {
        active: 'Hoạt động',
        expired: 'Hết hạn',
        pending: 'Chờ xử lý',
      },
    },
    users: {
      title: 'Quản lý Nhân viên',
      subtitle: 'Quản lý tài khoản nhân viên admin và phân quyền',
      addEmployee: 'Thêm Nhân viên',
      searchEmployee: 'Tìm kiếm nhân viên...',
      fullName: 'Họ tên',
      role: 'Vai trò',
      phoneNumber: 'Số điện thoại',
      status: 'Trạng thái',
      export: 'Xuất dữ liệu',
      filter: 'Lọc',
      superAdmin: 'Super Admin',
      admin: 'Admin',
      support: 'Support',
      working: 'Hoạt động',
      suspended: 'Tạm dừng',
    },
    transactions: {
      title: 'Quản lý Giao dịch',
      subtitle: 'Theo dõi tất cả các giao dịch thanh toán từ shops',
      totalTransactions: 'Tổng giao dịch',
      monthlyRevenue: 'Doanh thu tháng',
      successfulTransactions: 'Giao dịch thành công',
      failedTransactions: 'Giao dịch thất bại',
      searchTransaction: 'Tìm kiếm giao dịch...',
      exportData: 'Xuất dữ liệu',
      filter: 'Lọc',
      shop: 'Shop',
      package: 'Gói',
      type: 'Loại',
      paymentMethod: 'Phương thức',
      subscription: 'Đăng ký',
      renewal: 'Gia hạn',
      upgrade: 'Nâng cấp',
      refund: 'Hoàn tiền',
      bankTransfer: 'Chuyển khoản',
      creditCard: 'Thẻ tín dụng',
      successRate: 'Tỷ lệ thành công',
      failureRate: 'Tỷ lệ thất bại',
    },
    promotions: {
      title: 'Quản lý Khuyến mãi',
      subtitle: 'Tạo và quản lý các chương trình khuyến mãi cho shop',
      createPromotion: 'Tạo Khuyến mãi',
      searchPromotion: 'Tìm kiếm khuyến mãi...',
      discountType: 'Loại giảm giá',
      discountValue: 'Giá trị giảm',
      startDate: 'Ngày bắt đầu',
      endDate: 'Ngày kết thúc',
      targetPackage: 'Gói mục tiêu',
      usage: 'Sử dụng',
      minSubscriptionMonths: 'Thời hạn tối thiểu',
      appliesTo: 'Áp dụng cho',
      all: 'Tất cả',
      basicPackage: 'Gói Cơ bản',
      premiumPackage: 'Gói Nâng cao',
      percentage: 'Phần trăm',
      fixed: 'Số tiền cố định',
      from: 'Từ',
      to: 'đến',
      months: 'tháng',
      currentlyActive: 'Đang hoạt động',
      expired: 'Đã hết hạn',
      suspended: 'Tạm dừng',
      activate: 'Kích hoạt',
      suspend: 'Tạm dừng',
    },
    packages: {
      title: 'Quản lý Gói Dịch vụ',
      subtitle: 'Quản lý các gói dịch vụ POS và giá cả',
      createPackage: 'Tạo Gói Mới',
      price: 'Giá',
      subscribers: 'Đăng ký',
      features: 'Tính năng',
      featuresIncluded: 'Tính năng bao gồm',
      monthly: 'mỗi tháng',
      yearly: 'mỗi năm',
      discount: 'Giảm',
      currentlyActive: 'Đang hoạt động',
      suspended: 'Tạm dừng',
      packageStats: 'Thống kê Gói Dịch vụ',
      packageStatsSubtitle: 'Tổng quan về việc sử dụng các gói dịch vụ',
      totalShopSubscriptions: 'Tổng số shop đăng ký',
      monthlyRevenue: 'Doanh thu tháng này',
      activePremiumPackages: 'Gói Premium đang hoạt động',
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Phân tích chi tiết về hiệu suất và doanh thu của nền tảng POS',
      overview: 'Tổng quan',
      revenue: 'Doanh thu',
      shops: 'Shops',
      packages: 'Gói dịch vụ',
      totalRevenue: 'Tổng doanh thu',
      totalShops: 'Tổng số shops',
      retentionRate: 'Tỷ lệ giữ chân',
      premiumPackages: 'Gói Premium',
      industryDistribution: 'Phân bố theo ngành hàng',
      industryDistributionSubtitle: 'Top 5 ngành hàng có nhiều shops nhất',
      areaDistribution: 'Phân bố theo khu vực',
      areaDistributionSubtitle: 'Shops theo các quận tại TP.HCM',
      restaurants: 'Nhà hàng & Cafe',
      fashion: 'Thời trang',
      convenience: 'Cửa hàng tiện lợi',
      pharmacy: 'Dược phẩm',
      technology: 'Công nghệ',
      district1: 'Quận 1',
      district3: 'Quận 3',
      district5: 'Quận 5',
      district10: 'Quận 10',
      district7: 'Quận 7',
      revenueChart: 'Biểu đồ doanh thu theo tháng',
      revenueChartSubtitle: 'Xu hướng doanh thu trong 12 tháng gần đây',
      shopPackageChart: 'Thống kê shops theo gói',
      shopPackageChartSubtitle: 'Phân bố shops theo các gói dịch vụ',
      packagePerformance: 'Hiệu suất các gói dịch vụ',
      packagePerformanceSubtitle: 'So sánh hiệu suất giữa gói Basic và Premium',
      chartPlaceholder: 'Biểu đồ sẽ được hiển thị ở đây',
    },
    settings: {
      title: 'Cài đặt',
      profile: 'Hồ sơ',
      profileSubtitle: 'Cập nhật thông tin cá nhân',
      personalInfo: 'Thông tin cá nhân',
      updatePersonalInfo: 'Cập nhật thông tin cá nhân của bạn',
      firstName: 'Tên',
      lastName: 'Họ',
      updateInfo: 'Cập nhật thông tin',
      contactInfo: 'Thông tin liên lạc',
      manageContactInfo: 'Quản lý thông tin liên lạc',
      workEmail: 'Email công việc',
      workPhone: 'Số điện thoại công việc',
      emergencyContact: 'Liên hệ khẩn cấp',
      updateContact: 'Cập nhật liên lạc',
      security: 'Bảo mật',
      securitySubtitle: 'Quản lý mật khẩu',
      communication: 'Liên lạc',
      communicationSubtitle: 'Email và số điện thoại',
      permissions: 'Phân quyền',
      permissionsSubtitle: 'Kiểm soát truy cập',
      language: 'Ngôn ngữ',
      languageSubtitle: 'Chọn ngôn ngữ hiển thị',
      updateDetails: 'Cập nhật thông tin',
      managePassword: 'Quản lý mật khẩu',
      emailPhone: 'Email và số điện thoại',
      accessControl: 'Kiểm soát truy cập',
      selectLanguage: 'Chọn ngôn ngữ',
      vietnamese: 'Tiếng Việt',
      english: 'Tiếng Anh',
    },
    header: {
      searchPlaceholder: 'Tìm kiếm shops, khuyến mãi...',
      myAccount: 'Tài khoản của tôi',
      profile: 'Hồ sơ',
      settings: 'Cài đặt',
      logout: 'Đăng xuất',
    },
  },
  en: {
    common: {
      dashboard: 'Dashboard',
      shops: 'Shops',
      users: 'Users',
      transactions: 'Transactions',
      promotions: 'Promotions',
      packages: 'Packages',
      analytics: 'Analytics',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout',
      search: 'Search',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      noData: 'No data available',
      actions: 'Actions',
      status: 'Status',
      date: 'Date',
      amount: 'Amount',
      description: 'Description',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      expired: 'Expired',
      completed: 'Completed',
      failed: 'Failed',
      basic: 'Basic',
      premium: 'Premium',
      monthly: 'Monthly',
      yearly: 'Yearly',
      details: 'Details',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your POS platform statistics and performance.',
      newShopsToday: 'New Shops Today',
      totalActiveShops: 'Total Active Shops',
      revenueToday: 'Revenue Today',
      premiumPackages: 'Premium Packages',
      revenueOverview: 'Revenue Overview',
      revenueOverviewSubtitle: 'Monthly revenue from shop subscriptions',
      recentShopActivities: 'Recent Shop Activities',
      recentShopActivitiesSubtitle: 'Latest shop registrations and renewals',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      fromYesterday: 'from yesterday',
      fromLastWeek: 'from last week',
      fromLastMonth: 'from last month',
    },
    shops: {
      title: 'Shop Management',
      subtitle: 'Manage all shops registered to use POS',
      addShop: 'Add Shop',
      searchShop: 'Search shops...',
      package: 'Package',
      owner: 'Owner',
      expiryDate: 'Expiry Date',
      monthlyRevenue: 'Monthly Revenue',
      details: 'Details',
      edit: 'Edit',
      basicPackage: 'Basic Package',
      premiumPackage: 'Premium Package',
      status: {
        active: 'Active',
        expired: 'Expired',
        pending: 'Pending',
      },
    },
    users: {
      title: 'Employee Management',
      subtitle: 'Manage admin employee accounts and permissions',
      addEmployee: 'Add Employee',
      searchEmployee: 'Search employees...',
      fullName: 'Full Name',
      role: 'Role',
      phoneNumber: 'Phone Number',
      status: 'Status',
      export: 'Export',
      filter: 'Filter',
      superAdmin: 'Super Admin',
      admin: 'Admin',
      support: 'Support',
      working: 'Active',
      suspended: 'Suspended',
    },
    transactions: {
      title: 'Transaction Management',
      subtitle: 'Track all payment transactions from shops',
      totalTransactions: 'Total Transactions',
      monthlyRevenue: 'Monthly Revenue',
      successfulTransactions: 'Successful Transactions',
      failedTransactions: 'Failed Transactions',
      searchTransaction: 'Search transactions...',
      exportData: 'Export Data',
      filter: 'Filter',
      shop: 'Shop',
      package: 'Package',
      type: 'Type',
      paymentMethod: 'Payment Method',
      subscription: 'Subscription',
      renewal: 'Renewal',
      upgrade: 'Upgrade',
      refund: 'Refund',
      bankTransfer: 'Bank Transfer',
      creditCard: 'Credit Card',
      successRate: 'Success Rate',
      failureRate: 'Failure Rate',
    },
    promotions: {
      title: 'Promotion Management',
      subtitle: 'Create and manage promotional programs for shops',
      createPromotion: 'Create Promotion',
      searchPromotion: 'Search promotions...',
      discountType: 'Discount Type',
      discountValue: 'Discount Value',
      startDate: 'Start Date',
      endDate: 'End Date',
      targetPackage: 'Target Package',
      usage: 'Usage',
      minSubscriptionMonths: 'Min. Subscription Months',
      appliesTo: 'Applies to',
      all: 'All',
      basicPackage: 'Basic Package',
      premiumPackage: 'Premium Package',
      percentage: 'Percentage',
      fixed: 'Fixed Amount',
      from: 'From',
      to: 'to',
      months: 'months',
      currentlyActive: 'Currently Active',
      expired: 'Expired',
      suspended: 'Suspended',
      activate: 'Activate',
      suspend: 'Suspend',
    },
    packages: {
      title: 'Package Management',
      subtitle: 'Manage POS service packages and pricing',
      createPackage: 'Create New Package',
      price: 'Price',
      subscribers: 'Subscribers',
      features: 'Features',
      featuresIncluded: 'Features included',
      monthly: 'per month',
      yearly: 'per year',
      discount: 'Discount',
      currentlyActive: 'Currently Active',
      suspended: 'Suspended',
      packageStats: 'Package Statistics',
      packageStatsSubtitle: 'Overview of package usage',
      totalShopSubscriptions: 'Total Shop Subscriptions',
      monthlyRevenue: 'Monthly Revenue',
      activePremiumPackages: 'Active Premium Packages',
    },
    analytics: {
      title: 'Analytics',
      subtitle: 'Detailed analysis of platform performance and revenue',
      overview: 'Overview',
      revenue: 'Revenue',
      shops: 'Shops',
      packages: 'Packages',
      totalRevenue: 'Total Revenue',
      totalShops: 'Total Shops',
      retentionRate: 'Retention Rate',
      premiumPackages: 'Premium Packages',
      industryDistribution: 'Industry Distribution',
      industryDistributionSubtitle: 'Top 5 industries with most shops',
      areaDistribution: 'Area Distribution',
      areaDistributionSubtitle: 'Shops by districts in HCMC',
      restaurants: 'Restaurants & Cafes',
      fashion: 'Fashion',
      convenience: 'Convenience Stores',
      pharmacy: 'Pharmacy',
      technology: 'Technology',
      district1: 'District 1',
      district3: 'District 3',
      district5: 'District 5',
      district10: 'District 10',
      district7: 'District 7',
      revenueChart: 'Monthly Revenue Chart',
      revenueChartSubtitle: 'Revenue trend over the last 12 months',
      shopPackageChart: 'Shop Package Statistics',
      shopPackageChartSubtitle: 'Distribution of shops by service packages',
      packagePerformance: 'Package Performance',
      packagePerformanceSubtitle: 'Performance comparison between Basic and Premium packages',
      chartPlaceholder: 'Chart will be displayed here',
    },
    settings: {
      title: 'Settings',
      profile: 'Profile',
      profileSubtitle: 'Update personal information',
      personalInfo: 'Personal Information',
      updatePersonalInfo: 'Update your personal information',
      firstName: 'First Name',
      lastName: 'Last Name',
      updateInfo: 'Update Information',
      contactInfo: 'Contact Information',
      manageContactInfo: 'Manage contact information',
      workEmail: 'Work Email',
      workPhone: 'Work Phone',
      emergencyContact: 'Emergency Contact',
      updateContact: 'Update Contact',
      security: 'Security',
      securitySubtitle: 'Manage password',
      communication: 'Communication',
      communicationSubtitle: 'Email and phone number',
      permissions: 'Permissions',
      permissionsSubtitle: 'Access control',
      language: 'Language',
      languageSubtitle: 'Select display language',
      updateDetails: 'Update details',
      managePassword: 'Manage password',
      emailPhone: 'Email and phone number',
      accessControl: 'Access control',
      selectLanguage: 'Select language',
      vietnamese: 'Vietnamese',
      english: 'English',
    },
    header: {
      searchPlaceholder: 'Search shops, promotions...',
      myAccount: 'My Account',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
    },
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Return key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key
}
