// Mock setup (ایجاد یک mock adapter مشترک)
import MockAdapter from 'axios-mock-adapter';
import { MockAPI } from 'api/config/instance';

const mock = new MockAdapter(MockAPI);

export default mock;
