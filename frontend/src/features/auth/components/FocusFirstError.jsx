import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

function FocusFirstError() {
  const { errors, isValidating, submitCount } = useFormikContext();
  const handledSubmitCount = useRef(0);

  useEffect(() => {
    if (submitCount <= handledSubmitCount.current || isValidating) return;

    handledSubmitCount.current = submitCount;
    const firstInvalidField = Object.keys(errors)[0];
    if (firstInvalidField) document.getElementById(firstInvalidField)?.focus();
  }, [errors, isValidating, submitCount]);

  return null;
}

export default FocusFirstError;
