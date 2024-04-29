require "test_helper"

class FallbackControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get fallback_index_url
    assert_response :success
  end
end
