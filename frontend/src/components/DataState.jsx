export default function DataState({
  loading,
  error,
  isEmpty,
  children,
}) {
  if (loading) {
    return (
      <p role="status">
        Đang tải dữ liệu...
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert">
        Không thể tải dữ liệu: {error}
      </p>
    );
  }

  if (isEmpty) {
    return (
      <p>
        Chưa có dữ liệu phù hợp.
      </p>
    );
  }

  return children;
}