import {
  addAddressThunk,
  deleteAddressThunk,
  getAddressThunk,
  getDistrictThunk,
  getProvinceThunk,
  getWardThunk,
} from '@/kytesoft-client/store/address/thunks';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFormik } from 'formik';
import { get, map } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const useAddress = ({ messages = {} } = {}) => {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [address, setAddress] = useState({});

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const getAddress = useCallback(
    async ({ id }) => {
      try {
        const provinceResult = await dispatch(getAddressThunk({ id }));
        const result = unwrapResult(provinceResult);
        setAddress(result);
        return result;
      } catch (error) {}
    },
    [dispatch],
  );

  const getProvince = useCallback(async () => {
    try {
      const provinceResult = await dispatch(getProvinceThunk());
      const province = unwrapResult(provinceResult);
      setProvinceOptions(map(province, ({ id, name }) => ({ label: name, value: id })));
      return province;
    } catch (error) {}
  }, [dispatch]);

  const getDistrict = useCallback(
    async ({ provinceId }) => {
      try {
        const districtResult = await dispatch(getDistrictThunk({ provinceId }));
        const district = unwrapResult(districtResult);
        setDistrictOptions(map(district, ({ id, name }) => ({ label: name, value: id })));
        return district;
      } catch (error) {}
    },
    [dispatch],
  );

  const getWard = useCallback(
    async ({ district }) => {
      try {
        const wardResult = await dispatch(getWardThunk({ district }));
        const ward = unwrapResult(wardResult);
        setWardOptions(map(ward, ({ id, name }) => ({ label: name, value: id })));
        return ward;
      } catch (error) {}
    },
    [dispatch],
  );

  const addressForm = useFormik({
    initialValues: {
      id: null,
      address: '',
      province: null,
      district: null,
      ward: null,
      name: '',
      phone: '',
      type: '',
      isDefault: false,
    },
    validationSchema: Yup.object().shape({
      province: Yup.object().required(get(messages, 'province.required')),
      district: Yup.object().required(get(messages, 'district.required')),
      ward: Yup.object().required(get(messages, 'ward.required')),
      name: Yup.string().required(get(messages, 'name.required')),
      phone: Yup.string().required(get(messages, 'phone.required')),
      type: Yup.string().required(get(messages, 'type.required')),
      address: Yup.string().required(get(messages, 'address.required')),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(addAddressThunk({ ...values, isEdit }));
      } catch (error) {}
      setSubmitting(false);
    },
  });

  const onEditAddress = async ({ id }) => {
    const resp = await getAddress({ id });
    const {
      address,
      district,
      districtId,
      isDefault,
      name,
      phone,
      province,
      provinceId,
      type,
      ward,
      wardId,
    } = resp;
    addressForm.resetForm();
    addressForm.setValues({
      id,
      name,
      phone,
      type,
      address,
      isDefault,
      province: { label: province, value: provinceId },
      district: { label: district, value: districtId },
      ward: { label: ward, value: wardId },
    });

    setIsEdit(true);
  };

  const onAddAddress = () => {
    addressForm.resetForm();
    setIsEdit(false);
  };

  const onDeleteAddress = useCallback(
    async ({ id }) => {
      try {
        await dispatch(deleteAddressThunk({ id }));
      } catch (error) {}
    },
    [dispatch],
  );

  return {
    provinceOptions,
    getProvince,
    districtOptions,
    getDistrict,
    wardOptions,
    getWard,
    address,
    getAddress,
    addressForm,
    onEditAddress,
    onAddAddress,
    onDeleteAddress,
  };
};
